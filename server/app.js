const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('./middleware/cookieParser.js')
const cors = require('cors')
const adminRoutes = require('./routes/admin/index.js')
const homeRoutes = require('./routes/home/index.js')

var app = express()

// 跨域配置
app.use(cors({ origin: 'http://127.0.0.1:9528',credentials: true}))

// 配置body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置cookie-parser中间件
app.use(cookieParser())


// 配置默认路由
app.get('/', async (req, res) => {
    console.log(req.headers.cookie)
    res.send('hello express')
})

app.get('/cookie', async(req, res) => {
    res.cookie('name', 'hulk',{httpOnly: true, maxAge: 1000 * 10})
    res.send('cookie')
})

// 将static目录托管为静态资源服务器
app.use(express.static(__dirname + '/static'))

// 配置路由
app.use(adminRoutes, homeRoutes)

app.listen(9527)
