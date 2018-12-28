const router = require('express').Router()
const categories = require('./categories.js')

router.use('/novel', categories)

module.exports = router
