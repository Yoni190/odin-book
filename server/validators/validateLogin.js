const { body } = require('express-validator')


const validateLogin = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username should not be empty.'),
    
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password should not be empty.')

]

module.exports = validateLogin