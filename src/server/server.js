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
import morgan from 'morgan';

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

/**
 * using morgan for logging the output on the console
 */
// server.use(morgan(':method :url :status'));
// immediate will not log any information for the response
// server.use(morgan('tiny',{immediate:true}));
// server.use(morgan('dev'));
// server.use(morgan.token('type', (req, res) => req.headers['content-type']));
// server.use(morgan((tokens, req, res) => {
//     return [
//       tokens.method(req, res) === 'GET' ? 'GET Method used with :': 'lola',
//       tokens.url(req, res),
//       tokens.status(req, res),
//     ].join(' ');
//   }));
// server.use(morgan(':id :method :url :date[iso] :customMsg'));
// morgan.token('id', (req) => req.id);
// morgan.token('customMsg', (msg) => msg);

server.use(morgan('combined'));

/**
 * declaring the router for the request/response
 */
server.use(router);
/**
 * starting the server at the port 3000
 */
server.listen(PORT, function () {
    console.log("http://localhost:" + PORT);
});

