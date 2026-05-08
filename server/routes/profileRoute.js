const { Router } = require('express')
const profileController = require('../controllers/profileController')
const { authenticate } = require('../middleware/authenticate')


const router = Router()

router.get('/', authenticate, profileController.index)
router.get('/:id', authenticate, profileController.getUserInfo)
router.put('/', authenticate, profileController.update)

module.exports = router