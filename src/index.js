require('dotenv').config()
const express = require("express")
const app = express()
const router = require("./routes/api/v1/index")
const cors = require('cors')
const connectDB = require("./db/mongodb")
const cookieParser = require('cookie-parser')
const passport = require("passport")
const { googleProvider, facebookProvider } = require("./utils/Provider")
// const connectChat = require("./utils/socketIO")
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path=require('path')


// const swaggerDocument = YAML.load('./src/api.yaml')

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
googleProvider();
facebookProvider();


const _dirname = path.resolve();

const __swaggerDistPath = path.join(_dirname, 'node_modules', 'swagger-ui-dist'); //install swagger-ui-dist

const swaggerDocument = YAML.load(path.resolve('./public', 'api.yaml'));


app.use(
    '/api/docs',
    express.static(__swaggerDistPath, { index: false }), // Serve Swagger UI assets
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
            url: '/public/api.yaml' // Path to your YAML file
        }
    })
);
connectDB()
// connectChat()

app.use(cors({
    origin: 'https://fruitable-steel.vercel.app',
    credentials: true
}))
app.use(require('express-session')({ secret: 'fbfhdfhdfdhfh', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(express.json())
app.use(passport.session());

app.use(cookieParser())


//api/v1/categories
app.use('/', (req, res) => {
    res.send('hello world')
})

app.use("/api/v1", router)

app.listen(8000, () => {
    console.log("server started at port 8000");
})
