const { Router } = require('express')
const commentController = require('../controllers/commentController')
const { authenticate } = require('../middleware/authenticate')


const router = Router()

router.get('/:id/comments', authenticate, commentController.index)
router.post('/:id/comments', authenticate, commentController.store)


module.exports = router