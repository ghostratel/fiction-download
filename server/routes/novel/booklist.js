const router = require('express').Router()
const { responseWrapper } = require('../../modules/utils.js')
const DB = require('../../modules/DB.js')
const PAGE_COUNT = 20

router.get('/booklist/:cateID', (req, res) => {
	const { cateID } = req.params
	let { page } = req.query

	if(Number(page) < 0) {
		return res.send(responseWrapper({code: 0, data: '参数不合法'}))
	}

	page || (page = 1)
	DB.NovelModel.find({ categories: { $all: [cateID] } }).skip(page * PAGE_COUNT).limit(PAGE_COUNT).then(docs =>
		res.send(responseWrapper({code: 1, data:docs}))
	)
})

module.exports = router
