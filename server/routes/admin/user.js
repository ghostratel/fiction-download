const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { requiredParamValidate, responseWrapper, pbkdf2, verifyToken } = require('../../modules/utils.js')
const { AdminUserModel, genObjectID } = require('../../modules/DB.js')
const { SECRET_KEY, TOKEN_KEY, PASSWORD_SALT } = require('./CONSTANTS.js')

router.post('/login', (req, res, next) => {
    requiredParamValidate(['username', 'password'], req.body)
        .then(params => {
            let { username, password } = params
            AdminUserModel.findOne({ username })
                .then(user => {
                    if (user) {
                        pbkdf2(password, PASSWORD_SALT).then(code => {
                            if (code === user.password) {
                                let userAgent = req.headers['user-agent']
                                // 签发token
                                let access_token = jwt.sign({
                                    username: user.username,
                                    _id: user._id,
                                    userAgent
                                }, SECRET_KEY, { expiresIn: '7d' })
                                // 设置token到客户端cookie
                                res.cookie(TOKEN_KEY, access_token, {
                                    maxAge: 1000 * 60 * 60 * 24 * 7
                                })
                                res.send(responseWrapper({ code: 1, data: { msg: '登录成功', access_token, _id: user._id } }))
                                next()
                            } else {
                                res.send(responseWrapper({ code: 0, data: `密码错误!` }))
                                next()
                            }
                        })
                    } else {
                        res.send(responseWrapper({ code: 0, data: `用户 ${username} 不存在!` }))
                        next()
                    }
                })
        })
        .catch(key => {
            res.send(responseWrapper({ code: 0, data: `Param "${key}" must be required!` }))
            next()
        })
})

router.get('/info', (req, res, next) => {
    requiredParamValidate(['ADMIN_TOKEN'], req.query).then(() => {
        let { ADMIN_TOKEN } = req.query
        verifyToken(ADMIN_TOKEN, SECRET_KEY)
            .then(token => {
                let { _id } = token
                AdminUserModel.aggregate([{
                    $match: { _id: genObjectID(_id) }
                }, {
                    $project: { password: 0 }
                }])
                    .then(users => {
                        res.send(responseWrapper({ code: 1, data: users[0] }))
                        next()
                    })
                    .catch(() => {
                        res.send({ code: 0, data: '该用户不存在！' })
                    })
            })
            .catch(() => {
                res.send(responseWrapper({ code: 0, data: 'Invalid token!' }))
            })
    })
        .catch(key => {
            res.send(responseWrapper({ code: 0, data: `Parameter ${key} is required` }))
        })
})

router.get('/list', (req, res) => {
    AdminUserModel.aggregate([
        { $project: { password: 0 } }
    ])
        .then(docs => {
            res.send(responseWrapper({ code: 1, data: docs }))
        })
})

module.exports = router
