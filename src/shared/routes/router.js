/**
 * Router JS for the Express server
 * This will be included as the middleware for the project
 */
import express from 'express';
import React from 'react';
import { config as routes } from './config';
import { DEFAULT_HTTP_STATUS_CODE } from '../utils/constants';
import TemplateFactory from '../templates';
import { matchPath, StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import App from '..';

let router = express.Router();
/**
 * Using react router now for matching the paths and serving proper 
 * component. Express will no longer be use for that now.
 * Searching the routes config and using it's different parts
 */
router.get('*', async function (request, response, next) {
    // console.log(routes);
    const activeRoute = routes.find((route) => {
        return matchPath(request.url, route)
    }) || {};
    console.log(activeRoute);

    const templateGenerator = TemplateFactory.getTemplate();
    let { seo, status = DEFAULT_HTTP_STATUS_CODE, data_key } = activeRoute;
    let html, data = {};

    try {
        // if (activeRoute.loadData) {
        //     data = await activeRoute.loadData(request).data;
        // }

        let { data = {} } = activeRoute.loadData ? await activeRoute.loadData({ request }) : {};

        // console.log(data);

        html = renderToString(
            <StaticRouter location={request.url} context={{ data }}>
                <App />
            </StaticRouter>
        );
        let key;
        if (typeof data_key !== 'function') {
            key = data_key;
        } else {
            key = data_key({ request });
        }

        //for removing the Errors on client end need to pass on the initial data in window.
        response.status(status || DEFAULT_HTTP_STATUS_CODE).send(templateGenerator({ html, seo, data, data_key: key }));

    } catch (e) {
        // console.log(e);
        status = 404;
        html = e.toString();
        seo = 'Error page';
        response.status(status).send(templateGenerator({ html, seo, data, data_key: 'error_msg' }));
    }
    next();
});

export default router;