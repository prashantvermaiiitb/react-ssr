/**
 * Bundling config information for the file.
 * https://stackoverflow.com/questions/33001237/webpack-not-excluding-node-modules
 * 
 * @todo use Code splitting technique ?
 * @todo using webpack-dev-server for the local development ?
 */

// console.log("__dirname value ", __dirname);
var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
/**
 * Loading the environment variables based on environment settings in the package-json.
 * This has been moved here because we have now client JS also being bundled using the webpack
 * so it has to know from where the ENV variables have to be read.
 */
var dotenv = require('dotenv').config({ path: __dirname + '/.env' });

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const serverConfig = {
    // watch: true,//will keep on looking for file changes and re-bundle | can
    // be defined as -w in package json

    target: 'node', // in order to ignore built-in modules like path, fs, etc. 
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
    entry: "./src/server/server.js",
    output: {
        filename: "server.min.js",//minified bundle name for the server JS
        path: __dirname + "/dist" // output path has to be absolute in the new Webpack
    },
    module: {
        rules: [ // there is no "loaders" key it's being replaced with rules.
            {
                test: /\.(js|jsx)$/,
                exclude: /node_module/,
                loader: "babel-loader",
            },
            /**
             * * if this is not being written but only in the client 
             * * then server run will not be possible here.
             */
            {
                test: /\.css$/i,
                /**
                 * !css-loader loads the css from import 
                 * !style-loader does not work alone it has to be used with Css-loader.
                 * !after this only build is getting created here.
                 * !this is being written only in the client file.
                 */
                // use: [MiniCssExtractPlugin.loader,'css-loader'],
                use: ['style-loader', 'css-loader'],
                // use: ['css-loader'],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({ // putting __isBrowser__ in the global namespace
            __isBrowser__: "false",
            "process.env": dotenv.parsed
        })
    ]
};
/**
 * Client configuration for making and placing bundle.js
 */
const clientConfig = {
    entry: "./src/client/index.js",
    output: {
        filename: "bundle.min.js",//minified bundle name for the server JS
        path: __dirname + "/public/assets/js" // output path has to be absolute in the new Webpack
    },
    module: {
        rules: [ // there is no "loaders" key it's being replaced with rules.
            {
                test: /\.(js|jsx)$/,
                exclude: /node_module/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/i,
                //!style-loader does not work alone it has to be used with Css-loader.
                //!after this only build is getting created here.
                //! this is being written only in the client file.
                // use: [MiniCssExtractPlugin.loader, 'css-loader'],
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({ // putting __isBrowser__ in the global namespace
            __isBrowser__: "true",
            "process.env": dotenv.parsed
        })
    ]
};
module.exports = [serverConfig, clientConfig];