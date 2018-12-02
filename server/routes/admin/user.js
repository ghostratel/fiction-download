const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {requiredParamValidate, responseWrapper, pbkdf2, verifyToken} = require('../../modules/utils.js')
const db = require('../../modules/db.js')
const TOKEN_KEY = require('./TOKEN_KEY.js')
const PASSWORD_SALT = 'ADMIN_USER_SALT'


router.post('/login', (req, res, next) => {
    requiredParamValidate(['username', 'password'], req.body)
        .then(params => {
            let {username, password} = params
            db.getModel('AdminUserModel').findOne({username})
                .then(user => {
                    if(user) {
                        pbkdf2(password, PASSWORD_SALT).then(code => {
                            if(code === user.password) {
                                // 签发token
                                let access_token = jwt.sign({username: user.username}, TOKEN_KEY, {expiresIn: '7d'})
                                // 设置token到客户端cookie
                                res.cookie('access_token', access_token, {maxAge: 1000 * 60 * 60 * 24 * 7})
                                // 从数据库取出来的文档对象貌似无法直接删除其上面的属性，需要深拷贝后才能删除
                                user = JSON.parse(JSON.stringify(user))
                                delete user.password
                                res.send(responseWrapper({code: 1, data: user}))
                                next()
                            } else {
                                res.send(responseWrapper({code: 0, data: `密码错误!`}))
                                next()
                            }
                        })
                    } else {
                        res.send(responseWrapper({code:0, data: `用户 ${username} 不存在!`}))
                        next()
                    }
                })
        })
        .catch(key => {
            res.send(responseWrapper({code: 0, data: `Param "${key}" must be required!`}))
            next()
        })
})

router.post('/test', (req, res, next) => {
    res.send(responseWrapper({code: 1, data: 'success'}))
    next()
})

module.exports = router
