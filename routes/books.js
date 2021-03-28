const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('../views/pages/books.hbs', {
        title: 'Books',
        isBooks: true
    })
})

module.exports = router