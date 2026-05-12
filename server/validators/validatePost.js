const { body } = require("express-validator")

const validatePost = [
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Post should not be empty.')
]

module.exports = validatePost