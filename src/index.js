require('dotenv').config()
const express=require("express")
const app=express()
const router=require("./routes/api/v1/index")
const cors = require('cors')
const connectDB = require("./db/mongodb")
const cookieParser = require('cookie-parser')
const passport = require("passport")
const { googleProvider, facebookProvider } = require("./utils/Provider")
const connectChat = require("./utils/socketIO")
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');


const swaggerDocument = YAML.load('./src/api.yaml')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



connectDB()
connectChat()

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(require('express-session')({ secret: 'fbfhdfhdfdhfh', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(express.json())
app.use(passport.session());
app.use("/api/v1",router)
app.use(cookieParser())
googleProvider();
facebookProvider();

//api/v1/categories

app.listen(8000,()=>{
    console.log("server started at port 8000");
})
