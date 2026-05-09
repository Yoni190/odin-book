const { body } = require('express-validator')
const { prisma } = require('../lib/prisma')


const validateLogin = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username should not be empty.')
        .custom(async (username) => {
            const user = await prisma.user.findUnique({
                where: { username }
            })

            if(!user) {
                throw new Error('User not found.')
            }
        }),
    
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password should not be empty.')

]

module.exports = validateLogin