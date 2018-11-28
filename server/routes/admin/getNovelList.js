const router = require('express').Router()

router.get('/getNovelList', (req, res) => {
    res.send(['小说1', '小说2'])
})

module.exports = router