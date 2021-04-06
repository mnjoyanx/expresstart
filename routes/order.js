const {Router} = require('express')
const router = Router()



router.get('/', (req, res) => {
    res.render('pages/order.hbs', {
        title: 'Order',
        isOrder: true
    })
})

router.post('/', async (req, res) => {
        const allCartItems = await req.user.populate('card.items.bookId').execPopulate()
        const item = allCartItems.card.items.map(item => {
            return {
                count: item.count,
                book: {...item.bookId._doc}
            }
        })

        console.log(item, 'iteeeem')
})


module.exports = router