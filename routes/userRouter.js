const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserCotrollers')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)


module.exports = router;