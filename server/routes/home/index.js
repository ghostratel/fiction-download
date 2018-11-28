const router = require('express').Router()

router.get('/home', (req, res) => {
    res.send('hello world')
})

module.exports = router