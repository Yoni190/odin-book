const { Router } = require('express')
const followController = require('../controllers/followController')
const { authenticate } = require('../middleware/authenticate')



const router = Router()

// router.get('/', authenticate, followController.index)
router.get('/requests', authenticate, followController.requests)
router.get('/:id', authenticate, followController.getUserFollowers)
router.post('/:id', authenticate, followController.store)
router.delete('/:id', authenticate, followController.destroy)
router.patch('/:id', authenticate, followController.update)

module.exports = router