const Book = require('../models/books')
const { Router } = require('express')
const router = Router()

function mapCardItems(card) {
    return card.items.map(item => ({
        ...item.bookId._doc,
        count: item.count
    }))
}

function calculatePrice(books) {
    return books.reduce((total, book) => {
        return total += book.price * book.count
    }, 0)
}

router.get('/', async(req, res) => {
    const user = await req.user.populate('card.items.bookId').execPopulate()

    const books = mapCardItems(user.card)
    res.render('./pages/card.hbs', {
        title: 'Card',
        isCard: true,
        price: calculatePrice(books),
        books: books
    })
})

router.post('/add', async(req, res) => {
    const currentBook = await Book.findById(req.body.id)
    await req.user.addToCard(currentBook)


    res.redirect('/card')
})

router.delete('/remove/:_id', async(req, res) => {
    await req.user.removeFromCard(req.params._id)

    const user = await req.user.populate('card.items.bookId').execPopulate()
    const items = mapCardItems(user.card)

    const card = { items, price: calculatePrice(items) }
    res.json(card)
})

module.exports = router