const Order = require('../models/order')
const { Router } = require('express')
const router = Router()



router.get('/', async(req, res) => {
    const orders = await Order.find({ 'user.userId': req.user.id }).populate('user.userId')


    res.render('pages/order.hbs', {
        title: 'Order',
        isOrder: true,
        orders: orders.map(item => {
            return {
                ...item._doc,
                price: item.books.reduce((acc, val) => {
                    return acc += val.count * val.item.price
                }, 0)
            }

        })
    })
})

router.post('/', async(req, res) => {

    try {
        const allCartItems = await req.user.populate('card.items.bookId').execPopulate()
        const books = allCartItems.card.items.map(item => {
            return {
                count: item.count,
                item: {...item.bookId._doc }
            }
        })

        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },

            books
        })


        await order.save()
        await req.user.clearCard()

        res.redirect('/order')
    } catch (err) {
        console.log(err);
    }


})


module.exports = router