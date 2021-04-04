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

module.exports = model('User', userSchema)