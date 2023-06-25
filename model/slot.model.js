const mongoose = require('mongoose')

const slotSchema = mongoose.Schema({
    slotName: String,
    totalSlot: Array,
    avelableSlot: Array,
    bookedSlot: Array,
    user: String
})

const slotModel = mongoose.model('slots', slotSchema)

module.exports = {
    slotModel
}