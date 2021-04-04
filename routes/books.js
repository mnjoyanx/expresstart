const {Router} = require('express')
const router = Router()
const Book = require('../models/books')

router.get('/', async (req, res) => {
    const books = await Book.find().lean()
    res.render('pages/books', {
        title: 'Books',
        isBooks: true,
        books
    })
})

router.get('/:_id', async (req, res) => {
    const book = await Book.findById(req.params._id).lean()
    res.render('./pages/book', {
        layout: 'empty',
        title: `book ${book.title}`,
        book
    })
})


router.get('/:_id/edit', async (req, res) => {
    const book = await Book.findById(req.params._id).lean()
    res.render('./pages/editbook', {
        title: `Edit ${book.title}`,
        book
    })
})

router.post('/edit', async (req, res) => {
    await Book.findByIdAndUpdate(req.body._id, req.body)
    res.redirect('/books')
})

router.post('/remove', async (req, res) => {
    try {
        await Book.deleteOne({_id: req.body._id})
        res.redirect('/books')
    } catch(err) {
        console.log(err);
    }
    
})

module.exports = router