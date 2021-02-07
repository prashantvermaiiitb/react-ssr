
/**
 * process.NODE_ENV is being set by default to 'development'
 * process.NODE_ENV is being set to 'production' because webpack has mode set to 'production'
 */
//@todo custom Logger to be setup here in a file.
// console.log(process.env.NODE_ENV);

// console.log(process.env);

const ENV_SUFFIX = process.env[process.env.NODE_ENV];
// console.log(ENV_SUFFIX);

export const APP_PORT = process.env[`${ENV_SUFFIX}${process.env.PORT_INFO_SUFFIX}`];
export const LOG_INFO = process.env[`${ENV_SUFFIX}${process.env.LOG_INFO_SUFFIX}`];
// console.log(APP_PORT);

// console.log('app port based on the environment ',`${process.env.NODE_ENV}_${process.env.PORT_INFO}`);
/**
 * Paths that will be served using the server side rendering.
 */
export const PATHS = {
    HELLO_WORLD: '/',
    HELLO_WORLD_OLD: '/hello/:type/(:subtype)',
    USER_LIST: '/users',
    POST_FOR_USER: '/users/:userId/posts',
    COMMENT_ON_POST: '/posts/:postId/comments',
    ALL_POSTS: '/posts',
    NOTFOUND: '*',
};

/**
 * Path keys to be used while forming the configuration and reading it in the
 * server.js for route formation.
 */
export const PATH_CONFIG_KEYS = {
    PATH: 'path',
    STATUS: 'status',
    SEO: 'seo',
    LOAD_DATA: 'loadData',
    GENERATE_HTML: 'generateHtml'
}

//Default Http status code
export const DEFAULT_HTTP_STATUS_CODE = 200;

//container Id
export const APP_ID = 'app';

//key for the initial data for the server and client jS
export const STATE_KEY = 'app';