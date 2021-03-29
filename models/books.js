const { v4: uuidv4 } = require('uuid');
const path = require('path')
const fs = require('fs')

class Book {
    constructor(title, price, img) {
        this.title = title 
        this.price = price
        this.img = img
        this.id = uuidv4()
    }

    toObject() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    async save() {
        const books = await Book.getAll()
        books.push(this.toObject())

        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '../data/db.json'),
            JSON.stringify(books),
                err => {
                    if(err) {
                        rej(err)
                    } else {
                        res()
                    }
                }
            )
        })
        
    }

    static getAll() {
        return new Promise((res, rej) => {
           fs.readFile(
           path.join(__dirname, '../data/db.json'),
           'utf-8',
           (err, data) => {
               if(err) {
                rej(err)
               } else {
                res(JSON.parse(data))
               }
           }
       )
        })
       
    } 
}

module.exports = Book