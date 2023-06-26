const express = require('express')
const { userModel } = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRoute = express.Router()

userRoute.get('/', async (req, res) => {
    try {
        let users = await userModel.find()
        res.send(users)
    } catch (err) {
        res.send({ 'msg': 'Users not found' })
        console.log(err)
    }
})

userRoute.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params

        let user = await userModel.find({ _id })

        res.send(user)

    } catch (err) {

    }
})

userRoute.post('/register', async (req, res) => {
    const { name, email, password, avatar, dob, city, country, drivingExperience, insuranceNumber, role, phone, gender } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            res.send({ "msg": "Already have an account please login" })
        } else {
            bcrypt.hash(password, 9, async (err, hash) => {
                if (err) {
                    res.send("Something went wrong")
                } else {
                    const user = new userModel({ name, email, password: hash, avatar, dob, city, country, drivingExperience, insuranceNumber, role, phone, gender })
                    await user.save()
                    res.send({ "msg": "new user has been register", "sucess": true })
                }
            });
        }
    } catch (err) {
        res.send({ "msg": "Registration failed", "sucess": false })
        console.log(err)
    }
})

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "carparking")
                    res.send({ "msg": "Login sucessful", "sucess": true, token, user: user[0] })
                } else {
                    res.send({ "msg": "Wrong crediential", "sucess": false })
                }
            });
        } else {
            res.send({ "msg": "Wrong crediential", "sucess": false })
        }
    } catch (err) {
        res.send({ "msg": "Login failed", "sucess": false })
        console.log(err)
    }
})

userRoute.delete('/:_id', async (req, res) => {
    try {
        const { _id } = req.params

        await userModel.findByIdAndDelete({ _id })

        res.send({ 'msg': 'User has been deleted' })

    } catch (err) {
        res.send({ "msg": "User not deleted", "sucess": false })
        console.log(err)
    }
})

module.exports = {
    userRoute
}