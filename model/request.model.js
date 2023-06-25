const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
    userDetails: Object,
    place: String,
    status: String,
    seaction: String,
    entryDate: String,
    exitDate: String,
    type: String,
    Vehiclenumber: String,
    price: Number,
    review: Object,
    user: String
})

const requestModel = mongoose.model('requests', requestSchema)

module.exports = {
    requestModel
}