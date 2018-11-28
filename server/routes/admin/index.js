const router = require('express').Router()
const addNovel = require('./addNovel.js')
const getNovelList = require('./getNovelList.js')


router.use('/admin', addNovel, getNovelList)

module.exports = router