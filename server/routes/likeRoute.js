const { Router } = require('express')
const likeController = require('../controllers/likeController')
const { authenticate } = require('../middleware/authenticate')

const router = Router()

router.get('/likes/:likeId', authenticate, likeController.getLike)
router.get('/:id/likes', authenticate, likeController.index)
router.post('/:id/likes', authenticate, likeController.store)
router.delete('/:id/likes', authenticate, likeController.destroy)


module.exports = router