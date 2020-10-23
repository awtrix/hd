import Container from './Container'
import ApplicationBackend from './ApplicationBackend'
import { ApplicationIdentifier } from '../types/Application'
import { join } from 'path'
import shortid from 'shortid'
import onChange from 'on-change'

enum SwitchingReason {
  Loop,
  MaskableInterrupt,
  UnmaskableInterrupt,
}

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
  instantiateApplication (identifier: ApplicationIdentifier, userConfig: any) {
    const config = this.container.manager.config(identifier)

    let klass: typeof ApplicationBackend
    if (config.awtrix.backend) {
      const generator = require(join(this.container.manager.path(identifier), 'backend.js'))
      klass = generator(ApplicationBackend)
    } else {
      klass = ApplicationBackend
    }

    const app = new klass({ ...config, id: shortid.generate() }, userConfig) as ApplicationBackend
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
    console.log('Switching application', id)
    if (interrupt) this.interruptedApplicationID = this.activeApplicationID
    if (this.activeApplication) this.activeApplication.active = false

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
  start () {
    const db = this.container.database!

    db.get(['apps', 'rotation']).value().forEach((app) => this.instantiateApplication(app, app.config))
    this.switchToNextApplication()
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
