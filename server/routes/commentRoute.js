const { Router } = require('express')
const commentController = require('../controllers/commentController')
const { authenticate } = require('../middleware/authenticate')


const router = Router()

router.get('/:id/comments', authenticate, commentController.index)


module.exports = router