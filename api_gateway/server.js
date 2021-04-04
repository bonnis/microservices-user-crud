const express = require('express')
const app = express();

const bodyParser = require('body-parser')
const multer = require('multer')

const router = require('./api/routes')

const logger = (req,res,next)=>{
    console.log(req)
    next()
}

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(multer().array())
app.use
// app.use(logger)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router)

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log("API Gateway is running!");
});