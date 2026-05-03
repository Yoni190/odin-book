const express = require('express')
const cors = require('cors')
require('dotenv').config()
const routes = require('./routes/index')
const passport = require('./config/passport')


const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', routes.authRoute)

const PORT = process.env.PORT

app.listen(PORT, (error) => {
    if(error) {
        console.error(error)
    }

    console.log(`Server running on port ${PORT}`)
})