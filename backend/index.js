const {connectionDB} = require('./Db/db.js')
const express = require("express");
const rootRouter = require('./routes/index.js')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const PORT = 4000

app.use(express.json())
connectionDB()
app.use('/api/v1',rootRouter)
app.use(cors())



app.listen(PORT,(error)=>{
    console.log(error)
})