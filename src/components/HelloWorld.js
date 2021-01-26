/**
 * Simple function to return the Hello World HTML 
 */
const HelloWorld = () => {
    return (
        `<html>
            <head>
                <title>hello world!!!</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
                <link href="/assets/styles/style.css" rel="stylesheet">
            </head>
            <body>
                <div class="container">
                    <h1>hello world from Express JS!!</h1>
                </div>
            </body>
        </html>`
    );
}

/**
 * This will be needed because this CJS 
 * as we have not included any ES6 import support right now.
 * CJS module implementation for the module export
 * If this is being used and require() is used for getting this in the file
 * Error coming : HelloWorld is not a function()
 */
 // module.exports = HelloWorld;

export default HelloWorld;