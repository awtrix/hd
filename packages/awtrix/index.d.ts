declare namespace NodeJS {
  interface GlobalAwtrixOptions {
    rootPath: string,
    mode: 'dev' | 'static',
  }

  export interface Global {
    awtrix: GlobalAwtrixOptions
  }
}
