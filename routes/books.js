const { json } = require('body-parser')
const {Router} = require('express')
const router = Router()
const Book = require('../models/books')

router.get('/', async (req, res) => {
    const books = await Book.getAll()
    res.render('pages/books', {
        title: 'Books',
        isBooks: true,
        books
    })
})

router.get('/:id', async (req, res) => {
    const book = await Book.getCurrentBook(req.params.id)
    res.render('./pages/book', {
        layout: 'empty',
        title: `book ${book.title}`,
        book
    })
})

module.exports = router