const Router = require('express')
const router = new Router()
const typeController = require('../controllers/TypeControllers') 
const checkAuth = require('../middleware/checkAuthMiddleware')

router.post('/', checkAuth(), typeController.create )
router.get('/',  typeController.getAll)
router.get('/:id',  typeController.getOneType)
router.delete('/:id',checkAuth(),  typeController.delete)


module.exports = router;