const Card = require('../models/card')
const Book = require('../models/books')
const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('./pages/card.hbs', {
        title: 'Card',
        isCard: true
    })
})

router.post('/add', async(req, res) => {
    const currentBook = await Book.getCurrentBook(req.body.id)
    await Card.addToCard(currentBook)
})

module.exports = router