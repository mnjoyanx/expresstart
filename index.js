const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')

const cors = require('cors')
const homeRoute = require('./routes/home.js')
const booksRoute = require('./routes/books.js')
const addRoute = require('./routes/add.js')

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

// routes


const PORT = process.env.PORT || 5000

app.listen(5000, () => {
    console.log(`server is running on port ${PORT}`)
})