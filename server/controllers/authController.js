const passport = require('passport')
const { issueTokens } = require('../helpers/tokenHelper')
const { createUser } = require('../services/authService')
const { validationResult } = require('express-validator')
const { verifyAccessToken } = require('../utils/jwt')


const localLogin = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const error = errors.array()[0]

        return res.status(400).json({
            [error.path]: error.msg
        })
    }

    passport.authenticate('local', { session: false }, (err, user, info) => {
        if(err) return next(err)
        if(!user) return res.status(401).json({ error: info?.message })

        const accessToken = issueTokens(res, user.id)
        res.json({ accessToken })
    })(req, res, next)
}

const register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const error = errors.array()[0]


        return res.status(400).json({
            [error.path]: error.msg
        })
    }
    
    try {
        await createUser(req.body)

        return res.json({ message: 'User created successfully!' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

const verifyToken = (req, res) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            valid: false
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = verifyAccessToken(token)

        return res.json({ valid: true, user: decoded })
    } catch (error) {
        return res.status(401).json({ valid: false })
    }
}

module.exports = {
    localLogin,
    register,
    verifyToken
}