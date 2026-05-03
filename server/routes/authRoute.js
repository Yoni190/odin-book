const { Router } = require('express')
const authController = require('../controllers/authController')

const router = Router()

router.post('/login', authController.localLogin)


module.exports = router