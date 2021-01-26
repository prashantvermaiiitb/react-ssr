/**
 * Bundling config information for the file.
 * https://stackoverflow.com/questions/33001237/webpack-not-excluding-node-modules
 * 
 * @todo creation of 2 separate JSON objects for Development and production and using them ?
 */
console.log("__dirname value ", __dirname);
var nodeExternals = require('webpack-node-externals');
module.exports = {
    // watch: true,//will keep on looking for file changes and re-bundle | can
    // be defined as -w in package json
    
    target: 'node', // in order to ignore built-in modules like path, fs, etc. 
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
    entry: "./src/server/server.js",
    output: {
        filename: "server.min.js",//minified bundle name for the server JS
        path: __dirname + "/dist" // output path has to be absolute in the new Webpack
    },
};
9