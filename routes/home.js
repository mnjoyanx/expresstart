const { Router } = require('express')
const router = Router()


router.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Home',
        isHome: true
    })
})

router.get('/api', (req, res) => {
    res.json(35354)
})


module.exports = router