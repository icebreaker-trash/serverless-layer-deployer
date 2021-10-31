const Koa = require('koa')
const app = new Koa()
const Router = require('@koa/router')
const router = new Router()
const fs = require('fs')
const templete = fs.readFileSync('./index.html', {
  encoding: 'utf-8'
})
const nickName = 'ice breaker'
router.get('/', (ctx) => {
  ctx.body = templete.replace('<!--placeholder-->', nickName)
})

router.get('/hello', (ctx) => {
  ctx.body = 'world'
})
app.use(router.routes()).use(router.allowedMethods())
module.exports = app
