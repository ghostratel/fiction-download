const tokenValidator = require('../../middleware/tokenValidator.js')
const router = require('express').Router()
const user = require('./user.js')
const TOKEN_KEY = require('./TOKEN_KEY.js')

router.use('/admin/*', tokenValidator(TOKEN_KEY, ['/admin/user/login']))

router.use('/admin/user', user)

module.exports = router
