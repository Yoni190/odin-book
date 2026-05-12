const { Router } = require('express')
const postController = require('../controllers/postController')
const { authenticate } = require('../middleware/authenticate')
const validatePost = require('../validators/validatePost')

const router = Router()

router.get('/', authenticate, postController.index)
router.get('/me', authenticate, postController.getMyPosts)
router.get('/:id', authenticate, postController.post)
router.post('/', authenticate, validatePost, postController.store)
router.put('/:id', authenticate, postController.update)
router.delete('/:id', authenticate, postController.destroy)


module.exports = router