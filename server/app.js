const express = require('express')
const cors = require('cors')
require('dotenv').config()
const routes = require('./routes/index')
const passport = require('./config/passport')
const cookieParser = require('cookie-parser')
const FluxManager = require('flux-manager').default

const app = express()


const fluxManager = FluxManager.attach(app, {
  route: '/flux-manager',
  port: 3000,         
  maxRequests: 1000
});

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api/auth', routes.authRoute)
app.use('/api/posts', routes.postRoute)
app.use('/api/posts', routes.likeRoute)
app.use('/api/posts', routes.commentRoute)
app.use('/api/comments', routes.commentRoute)

app.use('/api/profile', routes.profileRoute)
app.use('/api/follows', routes.followRoute)

const PORT = process.env.PORT

app.listen(PORT, (error) => {
    if(error) {
        console.error(error)
    }

    console.log(`Server running on port ${PORT}`)
})