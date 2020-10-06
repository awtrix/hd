// Unfortunately nuxt doesn't yet provide typings for its
// programmatic usage, so we'll just have to make TypeScript
// happy manually for now.
//
// @see https://github.com/nuxt/typescript/issues/44

declare module 'nuxt' {
  const Nuxt: any
  const Builder: any
  export { Nuxt, Builder }
}
