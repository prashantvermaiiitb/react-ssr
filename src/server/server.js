/**
 * simple server @Port 3000 to serve 'hello world'
 */
let express = require('express');
// let HelloWorld = require('../components/HelloWorld');
/**
 * This is to be included as will be getting error that 
 * HelloWorld is not a function()
 */
import HelloWorld from '../components/HelloWorld';
import router from '../routes/users';
import { PATHS } from '../utils/constants';

let server = express();
const PORT = 3000;

/**
 * making the public folder as the static asset serving folder.
 * this will be used by the application to serve images, css, js or 
 * any other static asset.
 */
server.use(express.static('public'));

/**
 * Serving the Entire HelloWorld Html for the page.
 * Here no logic no templating is being used.
 * This just for demo to show how we can generate and send back the HTML.
 */
server.get(PATHS.HELLO_WORLD_OLD, function (request, response) {
    let html = HelloWorld();
    response.status(200).send(html);
});

server.use(router);
/**
 * starting the server at the port 3000
 */
server.listen(PORT, function () {
    console.log("http://localhost:" + PORT);
});

