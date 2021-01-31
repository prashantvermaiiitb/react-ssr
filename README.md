# react-ssr
Server side rendering using React, React  Router, Express, Node. 

This project will have separate branches that will be denoting the different stages in which the project will be initiated like :-

1. Branch Name : **express_only** :- 

   1. **Initial setup** : for the server JS to serve 'hello world !!'. 
      1. > This will give clarity about the dependencies needed for this and all other files that are needed to make it happen. (Check package json file for this.)
      2. > Using public folder for loading the assets : like favicon, styles, images. 
   
   2. **Bundling** : Using webpack :-
      1. > to create the bundle for the server JS and this will be used for running the server. 
      2. > Here we have to create webpack.config.js and use it for this purpose.
      3. > Internal & External Node modules are being excluded using special settings, for this webpack-node-externals have been used along with 'target:node' in webpack.config.js
      4. > for detecting the changes in the File and automatically re-bundle JS using 'watch' mode options as true : https://webpack.js.org/configuration/watch/. This flag can also be placed in the webpack.config.js.
      5. > npm install --save-dev rimraf : this will be done for clearing the build directory.

   3. **Continuous Update & Re-run** : Using nodemon 
      1. For restarting the server again rather than doing that manually. 
      2. Till the time we do not have this integration, manual server re-start is needed for loading the changes on the UI.

   4. **Inclusion of the ES6 Imports**
      1. > npm install --save @babel/core @babel/cli @babel/preset-env : These will help but they will create individual files, here we need this to be used by Webpack, for that we need babel-loader as well so that webpack will be using this loader for transpiling and then doing the bundling.
      2. Babel CLI will be useful in the package json, for the inclusion of the Babel directly.
      3. .babelrc file will be created for transpiling support 
      4. > npm install --save-dev @babel-loader : This will be used in webpack.config.js 

2.  Running the Project :-

    1.  Open 2 Terminals as below :-
        1.  > Run **npm install** for installing the dependencies.
        2.  > Run **npm run dev** for running the webpack in the watch mode, This will run the webpack in the dev mode with watch flag where it will create **bundle** again if there are changes in any of the files that it's watching (check the webpack.config.js) for this. 
        3.  > Run **npm run dev** for running the webpack in the watch mode 
        4.  > Open browser and type in : http://localhost:3000

3. Using Router MiddleWare for the Project for decoupling of the routes used in the application
   1. For that create 'routes' folder and in that we have copies the routes from the server.
   2. '/' will be the default route
   3. '/users' will be serving userList route
   4. '/users/:userId/comment' will be serving comments for the User
   5. '/notfound' will be used for all the other routes not listed

4. Using Axios for making the network calls and loading the data on the server side.
   1. > npm install --save axios : for installing the AXIOS to make the request. 