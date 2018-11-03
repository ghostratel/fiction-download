const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const app = new Koa()

const router = new Router()

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

app.use(require('koa-static')(__dirname + '/static'))

app.use(async (ctx, next) => {
    await next()
    if(ctx.status === 404) {
        ctx.body = '404'
    }
})

router.get('/some', async (ctx, next) => {
    let {id} = ctx.params
    ctx.body = id
    await next()
})

router.get('/', async (ctx, next) => {
    ctx.cookies.set('name', 'fg', {httpOnly: true})
    await ctx.render('index')
    next()
    console.log(ctx.cookies.get('name'))
})

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(9527)