const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    card: {
        items: [
            {
                count: {
                    type: Number,
                    default: 1
                },
                bookId: {
                    required: true,
                    type: Schema.Types.ObjectId,
                    ref: 'Book'
                }
            }
        ]
    }
})
    

userSchema.methods.addToCard = function(book) {
    const items = [...this.card.items]
    const idx = items.findIndex(item => item.bookId.toString() === book._id.toString())

    if(idx >= 0) {
        items[idx].count += 1
    } else {
        items.push({
            bookId: book._id,
            count: 1
        })
    }

    this.card = {items}
    return this.save()
}

module.exports = model('User', userSchema)