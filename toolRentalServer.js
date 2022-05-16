
require('dotenv').config()
const express = require('express')
const seq = require('./db')
const models = require('./models/models')
const cors = require('cors')
const routes = require('./routes/index')
const errorMiddleware = require('./middleware/ErrorHandlingMiddleware')
const fileupload = require('express-fileupload')
const path = require('path')
const PORT = process.env.PORT || 4000


const app = express()
app.use(cors())
app.use(express.json())
app.use(fileupload({}))
app.use(express.static(path.resolve(__dirname, 'static')))

 
app.use('/api', routes)
app.use(errorMiddleware)






const start = async () => {
    try{
        await seq.authenticate()
        await seq.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}
start()
