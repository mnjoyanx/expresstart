const fs = require('fs')
const path = require('path')

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
        const candidate = data.card.find(item => item.id === book.id)

        if (candidate) {

        } else {

        }

    }
}

module.exports = Card