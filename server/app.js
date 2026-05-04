const express = require('express')
const cors = require('cors')
require('dotenv').config()
const routes = require('./routes/index')
const passport = require('./config/passport')
const cookieParser = require('cookie-parser')


const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/auth', routes.authRoute)
app.use('/posts', routes.postRoute)

const PORT = process.env.PORT

app.listen(PORT, (error) => {
    if(error) {
        console.error(error)
    }

    console.log(`Server running on port ${PORT}`)
})