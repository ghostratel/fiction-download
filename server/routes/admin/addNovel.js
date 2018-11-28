const router = require('express').Router()

router.post('/addNovel', (req, res) => {
    res.send('addNovel')
    console.log(req.body)
})


router.post('/addSomething', (req, res) => {
    res.send('addSomething')
    console.log(req.body)
})

module.exports = router