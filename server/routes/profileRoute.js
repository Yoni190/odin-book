const { Router } = require('express')
const profileController = require('../controllers/profileController')
const { authenticate } = require('../middleware/authenticate')


const router = Router()

router.get('/', authenticate, profileController.index)


module.exports = router