const jwt = require('../utils/jwt')

const issueTokens = (res, userId) => {
    const accessToken = jwt.signAccessToken(userId)
    const refreshToken = jwt.signRefreshToken(userId)

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return accessToken
}

module.exports = { issueTokens }