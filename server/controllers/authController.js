const passport = require('passport')
const { issueTokens } = require('../helpers/tokenHelper')
const { createUser } = require('../services/authService')
const { validationResult } = require('express-validator')

const localLogin = (req, res, next) => {
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
        return res.status(400).json({
            message: errors.array()[0].msg
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

module.exports = {
    localLogin,
    register
}