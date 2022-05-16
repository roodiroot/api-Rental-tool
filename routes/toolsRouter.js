const Router = require('express')
const router = new Router()
const toolsController = require('../controllers/toolsControllers')
const checkAuth = require('../middleware/checkAuthMiddleware')

router.post('/', checkAuth(), toolsController.create)
router.get('/', toolsController.getAll)
router.get('/search', toolsController.getAllSearch)
router.get('/:id', toolsController.getOne )
router.put('/', toolsController.updadeTool )
router.delete('/:id', checkAuth(), toolsController.deleteTool)


module.exports = router;