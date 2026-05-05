const { Router } = require('express')
const profileController = require('../controllers/profileController')
const { authenticate } = require('../middleware/authenticate')


const router = Router()

router.get('/', authenticate, profileController.index)
router.put('/', authenticate, profileController.update)

module.exports = router