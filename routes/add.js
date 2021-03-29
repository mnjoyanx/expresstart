const { Router } = require('express')
const router = Router()
const Book = require('../models/books')


router.get('/', (req, res) => {
    res.render('pages/add', {
        title: 'Books',
        isAdd: true
    })
})


router.post('/', async (req, res) => {
    const {title, price, img} = req.body
    const book = new Book(title, price, img)
    await book.save()

    res.redirect('/books')
})

module.exports = router