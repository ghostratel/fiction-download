const router = require('express').Router()
const {requiredParamValidate, responseWrapper, pbkdf2} = require('../../modules/utils.js')
const db = require('../../modules/db.js')
const PASSWORD_SALT = 'ADMIN_USER_SALT'


router.post('/login', (req, res) => {
    requiredParamValidate(['username', 'password'], req.body)
        .then(params => {
            let {username, password} = params
            db.getModel('AdminUserModel').findOne({username})
                .then(user => {
                    if(user) {
                        pbkdf2(password, PASSWORD_SALT).then(code => {
                            if(code === user.password) {
                                res.send(responseWrapper({code: 1, data: user}))
                            } else {
                                res.send(responseWrapper({code: 0, data: `密码错误!`}))
                            }
                        })
                    } else {
                        res.send(responseWrapper({code:0, data: `用户 ${username} 不存在!`}))
                    }
                })
        })
        .catch(key => {
            res.send(responseWrapper({code: 0, data: `Param "${key}" must be required!`}))
        })
})

module.exports = router
