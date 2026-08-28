const { Router } = require('express')
const userController = require('../controllers/userController')
const { authenticate } = require('../middleware/authenticate')

const router = Router()

router.get('/', authenticate, userController.index)


module.exports = router