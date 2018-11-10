const Koa = require('koa')
const Router = require('koa-router')
const render = require('koa-art-template');
const path = require('path')
const {DB} = require('./modules/DB.js')
const bodyParser = require('koa-bodyparser')
const db = DB.getInstance()

const app = new Koa()

const router = new Router()

render(app, {
    root: __dirname + '/views',
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
});


app.use(require('koa-static')(__dirname + '/static'))
app.use(bodyParser())


router.get('/', async (ctx, next) => {
    let users = await db.find()
    await ctx.render('index', {users})
    await next()
})

router.get('/edit', async (ctx, next) => {
    let {_id} = ctx.request.query
    let user = await db.find({'_id': DB.createObjectID(_id)})
    await ctx.render('edit', {user: user[0]})
    await next()
})

router.get('/delete', async (ctx, next) => {
    let {_id} = ctx.request.query
    console.log(_id)
    await db.deleteOne('userinfo', {'_id': DB.createObjectID(_id)})
    ctx.redirect('/')
    await next()
})

router.post('/add', async (ctx, next) => {
    let user = ctx.request.body
    await db.insertOne('userinfo', user)
    ctx.body = '添加成功'
    await next()
})

router.post('/update', async (ctx, next) => {
    let user = ctx.request.body
    await db.updateOne('userinfo', {'_id': DB.createObjectID(user._id)}, {$set: {name: user.name, age: user.age}})
    ctx.redirect('/')
    await next()
})


app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(9527)