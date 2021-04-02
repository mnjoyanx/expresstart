const Card = require('../models/card')
const Book = require('../models/books')
const { Router } = require('express')
const router = Router()

router.get('/', async(req, res) => {
    const card = await Card.fetch()
    res.render('./pages/card.hbs', {
        title: 'Card',
        isCard: true,
        price: card.price,
        books: card.card
    })
})

router.post('/add', async(req, res) => {
    const currentBook = await Book.getCurrentBook(req.body.id)
    await Card.addToCard(currentBook)

    res.redirect('/books')
})

module.exports = router