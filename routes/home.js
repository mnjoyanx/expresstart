const {Router} = require('express')
const router = Router()


router.get('/', (req, res) => {
    res.render('../views/pages/index.hbs', {
        title: 'Home',
        isHome: true
    })
})

module.exports = router