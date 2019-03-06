const router = require('express').Router()
const categories = require('./categories.js')
const booklist = require('./booklist.js')
const rank = require('./rank.js')

router.use('/novel', categories, booklist, rank)

module.exports = router
