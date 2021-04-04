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
    const book = new Book({title: req.body.title, price: req.body.price, img: req.body.img, userId: req.user._id})
 
    try {
        await book.save()    
        res.redirect('/books')  

    } catch(err) {
        console.log(err)
    }
})

module.exports = router