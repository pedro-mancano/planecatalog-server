const dotenv = require("dotenv");
const Joi = require("joi");

dotenv.config({
    path: "./.env.local"
});

const envVarsSchema = Joi.object({
    JWT_SECRET: Joi.string().required(),
    MONGODB_URI: Joi.string().required(),
    COOKIE_SECRET: Joi.string().required(),
}).unknown().required();

if (envVarsSchema.validate(process.env).error) {
    console.error(`Error:\tMissing environment variables, please check .env.local`);
    console.error(`\t${envVarsSchema.validate(process.env).error.details[0].message}`);
    process.exit(1);
}

const app = require('./src/app');
const http = require('http');

const port = process.env.PORT || 3000;

http.createServer(app).listen(port, function () {
    console.log(`Server running on: http://localhost:${port}`);
});