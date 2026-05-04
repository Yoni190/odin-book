const { Router } = require('express')
const postController = require('../controllers/postController')
const { authenticate } = require('../middleware/authenticate')

const router = Router()

router.get('/', authenticate, postController.index)
router.get('/:id', authenticate, postController.post)
router.post('/', authenticate, postController.store)
router.put('/:id', authenticate, postController.update)


module.exports = router