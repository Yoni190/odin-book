const jwt = require('jsonwebtoken')
require('dotenv').config()

export const signAccessToken = (userId) => {
    jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES
    })
}

export const signRefreshToken = (userId) => {
    jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES
    })
}

export const verifyAccessToken = (token) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}

export const verifyRefreshToken = (token) => {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
}