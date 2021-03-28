const {Router} = require('express')
const router = Router()


router.get('/', (req, res) => {
    res.render('pages/books', {
        title: 'Books',
        isAdd: true
    })
})


module.exports = router