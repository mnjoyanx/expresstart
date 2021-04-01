const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('./pages/card.hbs', {
        title: 'Card',
        isCard: true
    })
})

module.exports = router