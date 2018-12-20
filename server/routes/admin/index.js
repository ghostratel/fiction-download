const tokenValidator = require('../../middleware/tokenValidator.js')
const router = require('express').Router()
const user = require('./user.js')
const { SECRET_KEY } = require('./CONSTANTS.js')

router.use('/admin/*', tokenValidator(SECRET_KEY, ['/admin/user/login']))

router.use('/admin/user', user)

module.exports = router
