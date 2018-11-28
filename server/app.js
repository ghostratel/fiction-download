var express = require('express')
var bodyParser = require('body-parser')
const adminRoutes = require('./routes/admin/index.js')
const homeRoutes = require('./routes/home/index.js')

var app = express()

// 配置body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置默认路由
app.get('/', (req, res) => {
    res.send('hello express')
})

// 将static目录托管为静态资源服务器
app.use(express.static(__dirname + '/static'))

// 配置路由
app.use(adminRoutes, homeRoutes)

app.listen(9527)