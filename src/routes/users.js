/**
 * Router JS for the Express server
 * This will be included as the middleware for the project
 */
import express from 'express';
import config from './config';
import { PATHS } from '../utils/constants';
import { filterRouteConfig } from './helper';

let router = express.Router();


/**
 * for the request at the home page location 
 * serve the "hello world"
 */
router.get(PATHS.DEFAULT, function (request, response) {
    let routeConfig = filterRouteConfig(request, config);
    // console.log(routeConfig);
    //@todo handling to be done for the unknown paths ?
    //@todo /userlist ==> what should be the HHTML to be served in this case ?
    let html = routeConfig.generateHtml();
    response.send(html);
});

export default router;