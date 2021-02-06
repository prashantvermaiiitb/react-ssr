import { PATHS, APP_ID, INITIAL_DATA } from "../utils/constants";
import serializeJavascript from "serialize-javascript";

/**
 * Template factory for getting the proper template object.
 */
export default class TemplateFactory {
    /**
     * Based on request Path getting proper Templates.
     * @param {*} requestPath 
     */
    static getTemplate(requestPath) {
        switch (requestPath) {
            case PATHS.USER_LIST:
            case PATHS.HELLO_WORLD:
            default:
                return ({ style, seo, html, data }) => (
                    `<html>
                        <head>
                            <title>${seo.title}</title>
                            <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
                            <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
                            <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
                            <link href="/assets/styles/style.css" rel="stylesheet">
                            ${style ? `<style>${style}</style>` : ''}
                            <script>window.${INITIAL_DATA}=${serializeJavascript(data)}</script>
                            <script type="text/javascript" defer src="/assets/js/bundle.min.js"></script>
                        </head>
                        <body>
                            <div class="container" id="${APP_ID}">${html}</div>  
                        </body>
                    </html>`
                );
        }
    }
}