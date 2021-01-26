import { PATHS } from "../utils/constants";

/**
 * Filtering the route config file and get the props route Object for loading 
 * data and generating the HTML from that component.
 * @param {*} request 
 * @param {*} config 
 */
export const filterRouteConfig = function (request, config) {
    return config.filter((config) => {
        return config.path == request.url;
    }).shift();
};

/**
 * Page Not Found configuration
 * @param {*} config 
 */
export const getPageNotFoundConfig = function (config) {
    return config.filter((pageConfig) => pageConfig.path === PATHS.NOTFOUND).shift();
};