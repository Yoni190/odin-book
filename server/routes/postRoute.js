const { Router } = require('express')
const postController = require('../controllers/postController')
const { authenticate } = require('../middleware/authenticate')

const router = Router()

router.get('/', authenticate, postController.index)


module.exports = router