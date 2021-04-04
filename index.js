const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const cors = require('cors')
const homeRoute = require('./routes/home.js')
const booksRoute = require('./routes/books.js')
const addRoute = require('./routes/add.js')
const cardRoute = require('./routes/card.js')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))

app.use(cors())
    // routes
app.use('/', homeRoute)

app.use('/books', booksRoute)

app.use('/add', addRoute)

app.use('/card', cardRoute)

// routes


const PORT = process.env.PORT || 5000


async function start() {
    try {
        const url = `mongodb+srv://mnjoyan:NERV71cP4TeMR3b2@cluster0.sc0pu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`)
        })
    } catch(err) {
        console.log(err)
    }
}

start()

