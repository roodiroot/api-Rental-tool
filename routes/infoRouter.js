const Router = require('express')
const router = new Router()
const toolsController = require('../controllers/toolsControllers')


router.get('/',  toolsController.getInfo)



module.exports = router;