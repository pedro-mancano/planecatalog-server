const dotenv = require("dotenv");
const Joi = require("joi");
const path = require('path');

dotenv.config({
    path: path.join(__dirname, '../', '.env.local')
});

const envVarsSchema = Joi.object({
    JWT_SECRET: Joi.string().required(),
    MONGODB_URI: Joi.string().required(),
    COOKIE_SECRET: Joi.string().required(),
}).unknown().required();

if (envVarsSchema.validate(process.env).error) {
    console.error(`Error:\tMissing environment variables, please check .env.local, \n\t${envVarsSchema.validate(process.env).error.details[0].message}`);
    process.exit(1);
}


const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;
const mongoSanitize = require('express-mongo-sanitize');
const favicon = require('serve-favicon');

const fs = require('fs');

app.disable('x-powered-by');
var connection = null;
app.use(async (req, res, next) => {
    if (connection == null) {
        connection = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            maxPoolSize: 1,
            serverSelectionTimeoutMS: 5000,
        });
    }
    next();
});

app.use(bodyParser.json({
    limit: '3mb'
}));
app.use(bodyParser.urlencoded({
    limit: '3mb',
    extended: true
}))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(mongoSanitize());

var corsAllowedOrigins = [
    "https://planecompare.pedromancano.xyz",
    "https://planecompare.vercel.app",
    "https://pcs.pedromancano.xyz",
    "https://planecompare-dev.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (origin.indexOf(':3000') > -1 || origin.indexOf(':8080') > -1) {
            return callback(null, true);
        } else if (corsAllowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    credentials: true
}));

app.use(function (req, res, next) {
    //console.log(`[${req.method}] ${req.path}`);
    next();
});


app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.get('/', (req, res) => {
    res.status(200);
    fs.createReadStream(path.join(__dirname, 'static', 'index.html')).pipe(res);
});

const planeRoute = require('./routes/Plane.route');
app.use('/plane', planeRoute);

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

module.exports = app;