const passport = require('passport')
const { issueTokens } = require('../helpers/tokenHelper')

const localLogin = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if(err) return next(err)
        if(!user) return res.status(401).json({ error: info?.message })

        const accessToken = issueTokens(res, user.id)
        res.json({ accessToken })
    })(req, res, next)
}

module.exports = {
    localLogin
}