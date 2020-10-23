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
  name: string,
  meta: {
    between: string[],
    displayLength: number,
  },
  config: any,
  index: number,
  version?: string
}

export type LifecycleApplication = RawApplication & {
  lifecycle: {
    ready: boolean,
    locked: boolean,
  },
}
