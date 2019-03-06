const router = require('express').Router()
const { responseWrapper } = require('../../modules/utils.js')
const DB = require('../../modules/DB.js')
const RANK_LEN = 10


/*
总榜 /rank/downloadsRank
月榜 /rank/downloadsRank?type=monthlyDownload
日榜 /rank/downloadsRank?type=dailyDownload
*/
router.get('/rank/downloadsRank', (req, res) => {
	let { type } = req.query
	type || (type = 'totalDownload')

	DB.NovelModel.find({}).then(docs => {
		let result = docs.sort((a, b) => a[type] > b[type] ? -1 : 1).slice(0, RANK_LEN)
		res.send(responseWrapper({code: 1, data: result}))
	})
})


module.exports = router
