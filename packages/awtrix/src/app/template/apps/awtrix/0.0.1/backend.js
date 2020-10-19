module.exports = (BaseClass) => {
  return class extends BaseClass {
    register (router) {
      router.get('/text', (ctx) => {
        ctx.body = 'Du Schlawiner'
      })
    }
  }
}
