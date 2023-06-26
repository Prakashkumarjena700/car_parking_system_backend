const express = require('express')
const { requestModel } = require('../model/request.model')

const requestRoute = express.Router()

requestRoute.get('/', async (req, res) => {
    try {
        const requests = await requestModel.find()
        res.send(requests)
    } catch (err) {
        res.send({ "msg": "Not get request", "sucess": false })
        console.log(err)
    }
})

requestRoute.get('/:user', async (req, res) => {
    try {
        const { user } = req.params
        const userRequest = await requestModel.find({ user })

        res.send(userRequest)

    } catch (err) {
        res.send({ "msg": "Not get user request", "sucess": false })
        console.log(err)
    }

})


requestRoute.post('/create', async (req, res) => {
    try {
        const request = new requestModel(req.body)
        await request.save()
        res.send({ "msg": "Request has been created", "sucess": true })

    } catch (err) {
        res.send({ "msg": "Request not created", "sucess": false })
        console.log(err)
    }
})

requestRoute.patch('/update/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const { seaction, status } = req.body

        await requestModel.findByIdAndUpdate({ _id }, { seaction, status })

        res.send({ 'msg': 'Request has been update', 'sucess': true })

    } catch (err) {
        res.send({ "msg": "Request not updated", "sucess": false })
        console.log(err)
    }
})

requestRoute.delete('/delete/:_id', async (req, res) => {
    try {
        const { _id } = req.params

        await requestModel.findByIdAndDelete({ _id })
        res.send({ 'msg': 'Request has been rejected' })

    } catch (err) {
        res.send({ "msg": "Request not rejected", "sucess": false })
        console.log(err)
    }
})

module.exports = {
    requestRoute
}