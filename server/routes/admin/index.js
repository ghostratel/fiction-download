const router = require('express').Router()
const user = require('./user.js')
const addNovel = require('./addNovel.js')
const getNovelList = require('./getNovelList.js')


router.use('/admin', user, addNovel, getNovelList)


module.exports = router
