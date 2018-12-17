const router = require('express').Router()
const categories = require('../../crawler/categories.js')
const { responseWrapper } = require('../../modules/utils.js')
const db = require('../../modules/DB.js')

for (let category of categories) {
    delete category.startPage
    delete category.done
}

router.get('/categories', (req, res) => {
    res.send(responseWrapper({
        code: 1,
        data: categories
    }))
})

router.get('/categories/:cateID', (req, res) => {
    let { cateID } = req.params
    if (categories.find(category => category.cateID === cateID)) {
        res.send(responseWrapper({code: 1, data: cateID}))
    } else {
        res.send(responseWrapper({ code: 0, data: '不存在此分类!' }))
    }
})

module.exports = router
