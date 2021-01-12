import Container from './Container'
import { BackendApp as ApplicationBackend } from '@awtrix/common'
import { ApplicationIdentifier } from '../types/Application'
import { join, resolve } from 'path'
import { debounce } from 'lodash'
import chokidar from 'chokidar'
import logger from '../utils/logger'
import onChange from 'on-change'

enum SwitchingReason {
  Loop,
  MaskableInterrupt,
  UnmaskableInterrupt,
}

type ApplicationInstanceIdentifier = ApplicationIdentifier & { id: string }

export default class ApplicationProcessor {
  /**
   * TODO
   */
  activeApplicationID?: string

  /**
   * TODO
   */
  interruptedApplicationID?: string

  /**
   * @type [SocketIO.Socket]
   */
  clients: SocketIO.Socket[] = []

  /**
   * TODO
   */
  applications: ApplicationBackend[]

  constructor(public container: Container) {
    this.applications = []
  }

  /**
   * TODO
   *
   * @param identifier
   */
  async instantiateApplication (identifier: ApplicationInstanceIdentifier, userConfig: any) {
    const config = await this.container.manager.config(identifier)
    const translations = await this.container.manager.translations(identifier)

    let klass: typeof ApplicationBackend
    if (config.awtrix.backend) {
      let generator = require(join(this.container.manager.path(identifier), 'backend.js'))
      if (generator.default) generator = generator.default
      klass = generator(ApplicationBackend)
    } else {
      klass = ApplicationBackend
    }

    const ns = this.io.of(`/apps/${identifier.id}`)
    const app = new klass({ ...config, id: identifier.id, translations }, userConfig, ns)

    this.applications.push(app)
    app.register()

    return app
  }

  /**
   *
   */
  get activeApplicationIndex (): number {
    return this.applications.findIndex((app) => app.config.id == this.activeApplicationID)
  }

  /**
   *
   */
  get activeApplication (): ApplicationBackend | undefined {
    return this.applications[this.activeApplicationIndex]
  }

  /**
   * TODO
   *
   * @param id
   * @param interrupt
   */
  enableApplication (id: string, interrupt = false) {
    if (interrupt) this.interruptedApplicationID = this.activeApplicationID
    if (this.activeApplication) this.activeApplication.active = false

    this.io.emit('activeApplicationID', id)
    this.activeApplicationID = id
    this.activeApplication!.active = true

    setTimeout(() => this.switchToNextApplication(), this.activeApplication!.displayLength)
  }

  /**
   * TODO
   *
   * @param reason
   */
  switchToNextApplication (reason: SwitchingReason = SwitchingReason.Loop) {
    this.switchApplication(this.nextAvailableApplication(), reason)
  }

  /**
   * TODO
   */
  nextAvailableApplication (): string {
    let index = this.activeApplicationIndex
    let count = 0
    do {
      index = (index + 1) % this.applications.length

      // TODO: Finalize this.
      if (count++ >= this.applications.length) break
    } while (!this.applications[index].ready)

    return this.applications[index].config.id
  }

  /**
   * TODO
   *
   * @param id
   * @param reason
   */
  switchApplication (id: string, reason: SwitchingReason) {
    // TODO: If this.interruptedApplicationIndex is set, switch back to it.

    switch (reason) {
      case SwitchingReason.UnmaskableInterrupt:
        return this.enableApplication(id, true)

      case SwitchingReason.MaskableInterrupt:
        return this.scheduleSwitch(id, true)

      case SwitchingReason.Loop:
        if (this.activeApplication?.locked) {
          return this.scheduleSwitch(id)
        }

        this.enableApplication(id)
    }
  }

  /**
   * TODO
   *
   * @param id
   * @param interrupt
   */
  scheduleSwitch (id: string, interrupt = false) {
    // TODO: By the time the switch takes place, it might not be ready anymore

    let watcher = onChange(this.activeApplication!, (path, value) => {
      if (path != 'locked' || !value) return

      this.enableApplication(id, interrupt)
      onChange.unsubscribe(watcher)
    })
  }

  /**
   * TODO
   */
  async start () {
    const db = this.container.database!

    if (this.container.liveReload) this.enableLiveReload()

    this.io.on('connection', (client) => {
      // this.clients.push(client)

      client.emit('applications', this.applications.map(app => app.asLifecycleApplication()))
      client.emit('activeApplicationID', this.activeApplicationID)
    })

    const apps = db.get(['apps', 'rotation']).value()
    for (let app of apps) {
      await this.instantiateApplication(app, app.config)
    }
    this.switchToNextApplication()
  }

  /**
   * TODO
   */
  enableLiveReload () {
    let watched = resolve(join(this.container.homeDirectory, 'apps'))
    logger.info(`Enabling live reload for ${watched}`)

    chokidar.watch(watched).on('all', debounce(() => {
      // TODO: Figure out if the file change happened to be a translation.
      // If so, we need to refresh the relevant app translations list

      this.io.sockets.emit('reload')
    }, 500))
  }

  get io () {
    return this.container.io!
  }
}

/**
  methods: {
    setLocked (app: LifecycleApplication, newState: boolean) {
      let index = this.applications.findIndex(a => a.id == app.id)
      this.applications[index].lifecycle.locked = newState
    },

    setReady (app: LifecycleApplication, newState: boolean) {
      let index = this.applications.findIndex(a => a.id == app.id)
      this.applications[index].lifecycle.ready = newState
    },

    destroy (app: LifecycleApplication) {
      this.setLocked(app, false)

      let index = this.applications.findIndex(a => a.id == app.id)
      this.applications.splice(index, 1)

      if (this.activeApplicationID == app.id) {
        this.switchToNextApplication()
      }
    },
  },
*/
