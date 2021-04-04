const express = require('express')
const app = express();

const bodyParser = require('body-parser')
const multer = require('multer')

const router = require('./api/routes')

var dbs = require("./db/DbConnection");

const logger = (req,res,next)=>{
    console.log(req)
    next()
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(multer().array())
// app.use(logger)

app.use(router)

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log("User Service is running!");
});