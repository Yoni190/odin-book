const { Router } = require('express')
const followController = require('../controllers/followController')
const { authenticate } = require('../middleware/authenticate')



const router = Router()

router.get('/', authenticate, followController.index)


module.exports = router