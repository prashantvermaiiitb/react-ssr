/**
 * Router JS for the Express server
 * This will be included as the middleware for the project
 */
import express from 'express';
import React from 'react';
import { config as routes } from './config';
import { DEFAULT_HTTP_STATUS_CODE, PATH_CONFIG_KEYS } from '../utils/constants';
import TemplateFactory from '../templates';
import { matchPath } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import NavBar from '../components/NavBar';

let router = express.Router();
/**
 * Using react router now for matching the paths and serving proper 
 * component. Express will no longer be use for that now.
 * Searching the routes config and using it's different parts
 */
router.get('*', async function (request, response, next) {
    // console.log(routes);
    try {
        const activeRoute = routes.find((route) => {
            return matchPath(request.url, route)
        }) || {};
        // console.log(activeRoute);
        const data = activeRoute.loadData ? await activeRoute.loadData(request) : undefined;
        const { seo, status } = activeRoute;
        const MyComponent = activeRoute.component;
        const html = renderToString(<div><MyComponent data={data && data.data ? data.data : undefined} /></div>)
        const templateGenerator = TemplateFactory.getTemplate();
        response.status(status || DEFAULT_HTTP_STATUS_CODE).send(templateGenerator({ html, seo }));
    } catch (e) {
        // console.log(e);
        response.status(status || DEFAULT_HTTP_STATUS_CODE).send(templateGenerator({ html: e.toString, seo: 'Error page' }));
        next();
    }


});

export default router;