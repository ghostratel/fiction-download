const router = require('express').Router()
const categories = require('./categories.js')
const booklist = require('./booklist.js')

router.use('/novel', categories, booklist)

module.exports = router
