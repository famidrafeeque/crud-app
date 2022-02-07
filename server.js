const express = require('express')
const dotEnv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const connectDb = require('./server/database/connection')
const mongoose = require('mongoose')

const app = express();

dotEnv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log request
app.use(morgan('tiny'))

//mongodb connection.
connectDb();    

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}))

//set view engine
app.set("view engine",'ejs')

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))

//load routes
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{
    console.log(`server is running in http://localhost:${PORT}`);
})