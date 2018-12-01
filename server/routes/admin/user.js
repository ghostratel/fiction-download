const router = require('express').Router()
const {requiredParamValidate, responseWrapper} = require('../../modules/utils.js')
const db = require('../../modules/db.js')


router.post('/login', (req, res) => {
    requiredParamValidate(['username', 'password'], req.body)
        .then((params) => {
            let {username, password} = params
            db.getModel('UserModel').findOne({username})
                .then(user => {
                    if(user) {
                        if(user.password === password) {
                            res.send(responseWrapper({code: 1, data: user}))
                        } else {
                            res.send(responseWrapper({code:0, data: `密码错误!`}))
                        }
                    } else {
                        res.send(responseWrapper({code:0, data: `用户 ${username} 不存在!`}))
                    }
                })
        })
        .catch((key) => {
            res.send(responseWrapper({code: 0, data: `Param "${key}" must be required!`}))
        })
})


module.exports = router
