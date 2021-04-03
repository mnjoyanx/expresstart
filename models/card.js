const fs = require('fs')
const path = require('path')
const { all } = require('../routes/books')

class Card {
    static fetch() {
        return new Promise((res, rej) => {
            fs.readFile(path.join(__dirname, '../data/card.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        rej(err)
                    } else {
                        res(JSON.parse(content))
                    }
                }
            )
        })
    }

    static async addToCard(book) {
        const data = await Card.fetch()
        const idx = data.card.findIndex(item => item.id === book.id)
        const candidate = data.card[idx]

        if (candidate) {
            candidate.count++
                data.card[idx] = candidate
        } else {
            book.count = 1
            data.card.push(book)
        }

        data.price += +book.price

        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '../data/card.json'),
                JSON.stringify(data),
                err => {
                    if (err) {
                        rej(err)
                    } else {
                        res()
                    }
                }
            )
        })

    }

    static async removeFromcard (id) {
        const allBooks = await Card.fetch()
        
        const idx = allBooks.card.findIndex(item => item.id === id)
        const book = allBooks.card[idx]

        if(book.count === 1 ) {
            allBooks.card = allBooks.card.filter(item => item.id !== id)
        } else {
            allBooks.card[idx].count--
        }

        allBooks.price -= +book.price

        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '../data/card.json'),
                JSON.stringify(allBooks),
                err => {
                    if(err) {
                        rej(err)
                    } else {
                        res(allBooks)
                    }
                }
            )
        })
    } 
}

module.exports = Card