const app = require('./src/app');
const http = require('http');

const port = process.env.PORT || 3000;

http.createServer(app).listen(port, function () {
    console.log(`Server running on: http://localhost:${port}`);
});