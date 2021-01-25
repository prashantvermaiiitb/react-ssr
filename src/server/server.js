/**
 * simple server @Port 3000 to serve 'hello world'
 */

let app = require('express');
let server = app();
const PORT = 3000;

/**
 * for the request at the home page location 
 * serve the "hello world"
 */
server.get('/', function (request, response) {
    let html = `<html><head><title>hello world</title></head><body><h1>hello world!!</h1></body></html>`;
    response.send(html);
});

/**
 * starting the server at the port 3000
 */
server.listen(PORT, function () {
    console.log("http://localhost:" + PORT);
});

