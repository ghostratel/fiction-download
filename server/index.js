const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')

const {MongoClient} = require('mongodb')
const MONGODB_URL = 'mongodb://127.0.0.1:27017'

const app = new Koa()

const router = new Router()

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))


app.use(require('koa-static')(__dirname + '/static'))


router.get('/', async (ctx, next) => {
    await ctx.render('index')
    await next()
})

router.get('/add', async (ctx, next) => {
    const client = await MongoClient.connect(MONGODB_URL, { useNewUrlParser: true })
    const db = client.db('user')
    await db.collection('userinfo').insertOne({name: 'rambo', age: 31})
    ctx.body = '数据写入成功'
    await client.close()
    await next()
})

router.get('/update', async (ctx, next) => {
    const client = await MongoClient.connect(MONGODB_URL, { useNewUrlParser: true })
    const db = client.db('user')
    await db.collection('userinfo').updateOne({name: 'jocker'}, {$set: {age: 44}})
    ctx.body = '数据修改成功'
    await client.close()
    await next()
})

router.get('/delete', async (ctx, next) => {
    const client = await MongoClient.connect(MONGODB_URL, { useNewUrlParser: true })
    const db = client.db('user')
    await db.collection('userinfo').deleteOne({name: 'jocker'})
    ctx.body = '数据删除成功'
    await client.close()
    await next()
})

router.get('/find', async (ctx, next) => {
    let list = []
    const client = await MongoClient.connect(MONGODB_URL, { useNewUrlParser: true })
    const db = client.db('user')
    const docs = await db.collection('userinfo').find()
    docs.forEach(doc => {
        list.push(doc)
    })
    await client.close()
    await ctx.render('list', {list})
    await next()
})

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(9527)