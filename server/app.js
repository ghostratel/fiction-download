const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const adminRoutes = require('./routes/admin/index.js')
const homeRoutes = require('./routes/home/index.js')

var app = express()

// 跨域配置
app.use(cors('http://127.0.0.1:9528'))

// 配置body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// 配置默认路由
app.get('/', async (req, res) => {
    res.send('hello express')
})

// 将static目录托管为静态资源服务器
app.use(express.static(__dirname + '/static'))

// 配置路由
app.use(adminRoutes, homeRoutes)

app.listen(9527)
