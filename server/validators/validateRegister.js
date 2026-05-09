const { body } = require('express-validator')
const { prisma } = require('../lib/prisma')


const validateRegister = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email should not be empty.')
        .custom(async (email, { path }) => {
            const user = await prisma.user.findUnique({
                where: { email }
            })

            if(user) {
                throw new Error(`${path.charAt(0).toUpperCase() + path.slice(1)} is already in use.`)
            }

            return true
        }),

    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username should not be empty.')
        .custom(async (username, { path }) => {
            const user = await prisma.user.findUnique({
                where: { username }
            })

            if(user) {
                throw new Error(`${path.charAt(0).toUpperCase() + path.slice(1)} is already in use.`)
            }

            return true
        }),

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password should not be empty.')
]

module.exports = validateRegister