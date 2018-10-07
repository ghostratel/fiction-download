const Koa = require('koa')
const views = require('koa-views')
const app = new Koa()

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

app.use(async (ctx, next) => {
    await ctx.render('index', {name: 'gg'})
})

app.listen(9527)