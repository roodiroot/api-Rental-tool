const Router = require('express')
const router = new Router()
const feedbackController = require('../controllers/feedbackController')
const checkAuth = require('../middleware/checkAuthMiddleware')

router.post('/',  feedbackController.create)
router.get('/', feedbackController.getAll)
router.put('/', feedbackController.update )
router.delete('/:id', checkAuth(), feedbackController.delete)


module.exports = router;