require("dotenv").config({
    path: "./.env.local"
});

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;

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
    limit: '2mb'
}));
app.use(bodyParser.urlencoded({
    limit: '2mb',
    extended: true
}))
app.use(cookieParser(process.env.cookieSecret));

var corsAllowedOrigins = [
    "https://planecompare.pedromancano.xyz",
    "https://planecompare.vercel.app",
    "https://pcs.pedromancano.xyz/"
];

app.use(cors({
    origin: function (origin, callback) {
        var msg = 'This website is not allowed to access your services';
        if (!origin) return callback(null, true);
        if (origin.indexOf(':3000') > -1 || origin.indexOf(':8080') > -1) {
            return callback(null, true);
        } else if (corsAllowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(msg, false);
        }
    },
    credentials: true
}));

app.use(function (req, res, next) {
    console.log(`[${req.method}] ${req.path}`);
    next();
});


app.get('/favicon.ico', (req, res) => {
    res.status(200).send(fs.readFileSync(__dirname + '/static/favicon.ico'));
});
app.get('/', (req, res) => {
    res.status(200).send(fs.readFileSync(__dirname + '/static/index.html', 'utf8').toString());
});

const planeRoute = require('./routes/plane.route');
app.use('/plane', planeRoute);


// 404 and Error handling
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

module.exports = app;