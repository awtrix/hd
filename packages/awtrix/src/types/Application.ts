export type RawApplication = {
  name: string,
  id: string,
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
