import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package'

export type ApplicationIdentifier = { name: string, version: string }

export type ApplicationConfig = JSONSchemaForNPMPackageJsonFiles & {
  awtrix: {
    backend?: boolean,
    frontend?: boolean,
    assets?: boolean,
    defaultDisplayLength?: number
  }
}

export type RawApplication = {
  id: string,
  name: string,
  version: string,
  config: any,
}

export type LifecycleApplication = RawApplication & {
  lifecycle: {
    ready: boolean,
    locked: boolean,
  },
}
