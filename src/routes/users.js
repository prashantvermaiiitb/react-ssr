/**
 * Router JS for the Express server
 * This will be included as the middleware for the project
 */
import express from 'express';
import config from './config';
import { DEFAULT_HTTP_STATUS_CODE, PATH_CONFIG_KEYS } from '../utils/constants';

let router = express.Router();

/**
 * Iterate over the routes and provide the proper route config to the user.
 * @todo Error handling for the config items that are not having entire information as well.
 */
for (var i in config) {
    let routeConfig = config[i];
    //@todo should work towards getting proper HTTP method from the routeConfig for this
    router.get(routeConfig[PATH_CONFIG_KEYS.PATH], async function (request, response) {
        let html = await routeConfig[PATH_CONFIG_KEYS.GENERATE_HTML]({ request });
        //@todo what if html is undefined or not proper?
        response.status(routeConfig[PATH_CONFIG_KEYS.STATUS] || DEFAULT_HTTP_STATUS_CODE).send(html);
    });
}



export default router;