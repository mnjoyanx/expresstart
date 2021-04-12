const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/user')

const cors = require('cors')
const homeRoute = require('./routes/home.js')
const booksRoute = require('./routes/books.js')
const addRoute = require('./routes/add.js')
const cardRoute = require('./routes/card.js')
const orderRoute = require('./routes/order')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(async(req, res, next) => {
    try {
        const user = await User.findById('606ab0f615cd943438952881')
        req.user = user
        next()

    } catch (err) {
        console.log(err)
    }
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))

app.use(cors())
    // routes
app.use('/', homeRoute)

app.use('/books', booksRoute)

app.use('/add', addRoute)

app.use('/card', cardRoute)

app.use('/order', orderRoute)

// routes


const PORT = process.env.PORT || 5000


async function start() {
    try {
        const url = `mongodb+srv://mnjoyan:qzNNZhzSFsj8uGWR@cluster0.1bwis.mongodb.net/bookStore?retryWrites=true&w=majority`
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

        const candidate = await User.findOne()

        if (!candidate) {
            const user = new User({
                email: 'tigranmnjoyan@gmail.com',
                name: 'Tigran',
                card: { items: [] }
            })

            await user.save()
        }
        app.listen(5000, () => {
            console.log(`server is running on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()