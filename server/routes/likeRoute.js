const { Router } = require('express')
const likeController = require('../controllers/likeController')
const { authenticate } = require('../middleware/authenticate')

const router = Router()

router.get('/:id/likes', authenticate, likeController.index)


module.exports = router