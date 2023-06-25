const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String,
    role: String,
    avatar: String,
    dob: String,
    phone: String,
    city: String,
    country: String,
    drivingExperience: Number,
    insuranceNumber: String
})

const userModel = mongoose.model('users', userSchema)

module.exports = {
    userModel
}