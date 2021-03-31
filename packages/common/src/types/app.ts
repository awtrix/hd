import { PackageJson } from 'type-fest'

export type ApplicationIdentifier = { name: string, version: string }

export type ApplicationTranslations = {
  [key: string]: { [key: string]: string }
}

export type ApplicationConfig = PackageJson & {
  awtrix: {
    build: {
      backend?: boolean,
      frontend?: boolean,
      assets?: boolean,
    }
    defaultDisplayLength?: number,
    settings: any, // TODO: Properly type the settings hash
  }
}

export type RawApplication = {
  id: string,
  name: string,
  version: string,
  config: any,
}

export type LifecycleApplication = RawApplication & {
  userConfig: any,
  lifecycle: {
    ready: boolean,
    locked: boolean,
  },
}
