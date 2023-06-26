const express = require('express')
const { slotModel } = require('../model/slot.model')

const slotRoute = express.Router()

slotRoute.get('/', async (req, res) => {
    try {
        const slots = await slotModel.find()
        res.send(slots)
    } catch (err) {
        res.send({ 'msg': 'No slot find', 'success': false })
        console.log(err)
    }
})

slotRoute.post('/create', async (req, res) => {
    try {
        const slot = new slotModel(req.body)
        await slot.save()

        res.send({ 'msg': 'Slot has been created', 'success': true })

    } catch (err) {
        res.send({ 'msg': 'Slot not created', 'success': false })
        console.log(err)
    }
})

slotRoute.patch('/addIntoSlot/:_id', async (req, res) => {
    try {
        const { _id } = req.params

        const { newSlotName } = req.body

        await slotModel.findByIdAndUpdate(_id, {
            $push: {
                totalSlot: newSlotName,
                avelableSlot: newSlotName,
            }
        })
        res.send({ 'msg': 'Slot has been added', 'success': true })

    } catch (err) {
        res.send({ 'msg': 'Slot not Added', 'success': false })
        console.log(err)
    }
})

slotRoute.patch('/booking/:_id', async (req, res) => {
    try {
        const { bookingSlotName } = req.body
        const { _id } = req.params

        await slotModel.findByIdAndUpdate({ _id }, { $push: { bookedSlot: bookingSlotName } })
        await slotModel.findByIdAndUpdate({ _id }, { $pull: { avelableSlot: bookingSlotName } })

        res.send({ 'msg': `${bookingSlotName} has been booked`, 'success': true })

    } catch (err) {
        res.send({ 'msg': 'Not yet booked', 'success': false })
        console.log(err)
    }
})

slotRoute.patch('/end/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const { removeSlotName } = req.body

        await slotModel.findByIdAndUpdate({ _id }, { $pull: { bookedSlot: removeSlotName } })
        await slotModel.findByIdAndUpdate({ _id }, { $push: { avelableSlot: removeSlotName } })

        res.send({ 'msg': `${removeSlotName} has been finish`, 'success': true })
    } catch (err) {
        res.send({ 'msg': 'Not able to process something went wrong', 'success': false })
        console.log(err)
    }
})

slotRoute.get('/:_id', async (req, res) => {
    try {

        const { _id } = req.params

        let particularSlot = await slotModel.find({ _id })
        res.send(particularSlot)
    } catch (err) {
        res.send({ 'msg': 'Not found' })
        console.log(err)
    }
})

module.exports = {
    slotRoute
}