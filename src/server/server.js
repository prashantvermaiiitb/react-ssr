/**
 * simple server @Port 3000 to serve 'hello world'
 */

let express = require('express');
let HelloWorld = require('../components/HelloWorld');
let server = express();
const PORT = 3000;

/**
 * making the public folder as the static asset serving folder.
 * this will be used by the application to serve images, css, js or 
 * any other static asset.
 */
server.use(express.static('public'));

/**
 * for the request at the home page location 
 * serve the "hello world"
 */
server.get('/', function (request, response) {
    let html = HelloWorld();
    response.send(html);
});

/**
 * starting the server at the port 3000
 */
server.listen(PORT, function () {
    console.log("http://localhost:" + PORT);
});

