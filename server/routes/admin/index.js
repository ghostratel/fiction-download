const router = require('express').Router()
const user = require('./user.js')

router.use('/admin/user', user)


module.exports = router
