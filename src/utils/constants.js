/**
 * Paths that will be served using the server side rendering.
 */
export const PATHS = {
    HELLO_WORLD: '/',
    HELLO_WORLD_OLD: '/hello',
    USER_LIST: '/users',
    POST_FOR_USER: '/users/:userId/posts',
    COMMENT_ON_POST: '/posts/:postId/comments',
    ALL_POSTS: '/posts',
    NOTFOUND: '*',
    // DEFAULT: '*',
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