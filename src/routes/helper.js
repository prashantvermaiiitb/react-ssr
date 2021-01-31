import { PATHS } from "../utils/constants";

/**
 * Filtering the route config file and get the props route Object for loading 
 * data and generating the HTML from that component.
 * @param {*} request 
 * @param {*} config 
 */
export const filterRouteConfig = function (request, config) {
    return config.filter((config) => {
        console.log(request.url);
        return request.url == config.path; //after comments/user/id this will not work properly
        // return request.url.indexOf(config.path) !== -1; //regex match is the best option
    }).shift();
};

/**
 * Page Not Found configuration
 * @param {*} config 
 */
export const getPageNotFoundConfig = function (config) {
    return config.filter((pageConfig) => pageConfig.path === PATHS.NOTFOUND).shift();
};