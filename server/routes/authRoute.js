const { Router } = require('express')
const authController = require('../controllers/authController')
const validateRegister = require('../validators/validateRegister')
const validateLogin = require('../validators/validateLogin')



const router = Router()

router.post('/login', validateLogin, authController.localLogin)
router.post('/register', validateRegister, authController.register)


module.exports = router