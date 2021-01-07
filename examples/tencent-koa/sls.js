const Koa = require('koa')
const app = new Koa()
const Router = require('@koa/router')
const router = new Router()

router.get('/', (ctx) => {
  ctx.body = 'SonOfMagic'
})

router.get('/hello', (ctx) => {
  ctx.body = 'world'
})
app.use(router.routes()).use(router.allowedMethods())
module.exports = app
