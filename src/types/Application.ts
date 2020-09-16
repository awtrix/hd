export type RawApplication = {
  name: string,
  id: string,
  meta: {
    between: string[],
    displayLength: number,
  },
  config: any,
  index: number,
}

export type LifecycleApplication = RawApplication & {
  lifecycle: {
    ready: boolean,
    locked: boolean,
  },
}
