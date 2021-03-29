const { Router } = require('express')
const router = Router()


router.get('/', (req, res) => {
    res.render('pages/add', {
        title: 'Books',
        isAdd: true
    })
})



module.exports = router