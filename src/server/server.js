import React from 'react';
import { renderToString } from 'react-dom/server';
/**
 * simple server @Port 3000 to serve 'hello world'
 */
let express = require('express');
// let HelloWorld = require('../components/HelloWorld');
/**
 * This is to be included as will be getting error that 
 * HelloWorld is not a function()
 */
import HelloWorld from '../shared/components/HelloWorld';
import router from '../shared/routes/router';
import { PATHS, APP_PORT, LOG_INFO } from '../shared/utils/constants';
import morgan from 'morgan';
import NavBar from '../shared/components/NavBar';

let server = express();

/**
 * making the public folder as the static asset serving folder.
 * this will be used by the application to serve images, css, js or 
 * any other static asset.
 */
server.use(express.static('public'));
/**
 * using morgan for logging the output on the console
 */
server.use(morgan(LOG_INFO));

/**
 * Serving the Entire HelloWorld Html for the page.
 * Here no logic no templating is being used.
 * This just for demo to show how we can generate and send back the HTML.
 */
server.get(PATHS.HELLO_WORLD_OLD, function (request, response) {
    let type = request.params.type || undefined; //by default this will be returned as string
    let subtype = request.params.subtype || undefined;
    let html;

    switch (type) {
        case '1':
            // Approach#1 : Using react.createElement
            // http://localhost:3000/hello/1/tmpl
            // http://localhost:3000/hello/1/jsx
            // http://localhost:3000/hello/1/react
            html = renderToString(<div><NavBar />{React.createElement(HelloWorld, { type, subtype })}</div>);
            break;
        default:
            // Approach#2 : Instantiating the Tag
            // http://localhost:3000/hello/2/tmpl
            // http://localhost:3000/hello/2/jsx
            // http://localhost:3000/hello/2/react
            html = renderToString(<div><NavBar /><HelloWorld type={type} subtype={subtype} /></div>);
    }
    response.status(200).send(html);
});

/**
 * declaring the router for the request/response
 */
server.use(router);

/**
 * starting the server at the port 3000
 */
server.listen(APP_PORT, function () {
    console.log("http://localhost:" + APP_PORT);
});

