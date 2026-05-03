const express = require('express')
const cors = require('cors')
require('dotenv').config()
const {prisma} = require('./lib/prisma')

const app = express()

app.use(express.json())
app.use(cors())


const PORT = process.env.PORT

app.listen(PORT, (error) => {
    if(error) {
        console.error(error)
    }

    console.log(`Server running on port ${PORT}`)
})