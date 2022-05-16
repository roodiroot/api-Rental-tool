const Router = require('express')
const router = new Router()
const userRoute = require('./userRouter')
const toolsRoute = require('./toolsRouter')
const typeRoute = require('./typeRouter')
const infoRoute = require('./infoRouter')
const feedbackRoute = require('./feedbackRouter')

router.use('/user', userRoute)
router.use('/tools', toolsRoute)
router.use('/type', typeRoute)
router.use('/info', infoRoute)
router.use('/feedback', feedbackRoute)

module.exports = router;
