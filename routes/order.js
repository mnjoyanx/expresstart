const Order = require('../models/order')
const { Router } = require('express')
const router = Router()



router.get('/', async(req, res) => {
    const orders = await Order.findById('60740c71a2b0634305fca9ab')
    console.log(orders, 'orders')
    res.render('pages/order.hbs', {
        title: 'Order',
        isOrder: true
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