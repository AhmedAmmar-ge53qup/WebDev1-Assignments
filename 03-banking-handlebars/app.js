import express from 'express'
import router from './app/router.js'
import morgan from 'morgan'
import mongoose from "mongoose";
import {engine} from "express-handlebars";

//port number
const port = 5000
const app = express()

const uri = 'mongodb://127.0.0.1:27017/b54-db'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, options, () => {
    console.log(`database connection established`)
})

//two types [dynamic , static]
app.engine("hbs", engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "public/layouts/"
}));
app.set('view engine','hbs');
app.set('views', 'public');

app.use(express.static('public'))
//a middleware
app.use(morgan('dev'))
app.use(express.json())
app.use('/', router)

//CRUD operations on
app.listen(port, () => {
    console.log(`Server started @http://localhost:${port}`)
})

//single purpose [design pattern]
//separation of concerns 

//repository : the only class allowed to talk to our data
//service : the only class that can communicate with the repo
//router : responsible for handling all the routing
//app for server configurations

