const express = require('express')
const { connection } = require('./config/db')
const { userRoute } = require('./routes/user.route')
const { authenticate } = require('./middleware/auth.middleware')
const { requestRoute } = require('./routes/request.route')
const cors = require('cors')
const { slotRoute } = require('./routes/slot.route')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Welcome to car parking reservation system')
})

app.use('/user', userRoute)
app.use(authenticate)
app.use('/request', requestRoute)
app.use('/slot', slotRoute)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log('Connected to DB')
    } catch (err) {
        console.log('Not connected to DB')
        console.log(err)
    }
    console.log(`Server is running at port ${process.env.port}`)
})