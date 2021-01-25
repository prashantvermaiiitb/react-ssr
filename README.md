# react-ssr
Server side rendering using React, React  Router, Express, Node. 

This project will have separate branches that will be denoting the different stages in which the project will be initiated like :-

1. **express_only** :- 

   1. **Initial setup** : for the server JS to serve 'hello world !!'. 
      1. > This will give clarity about the dependencies needed for this and all other files that are needed to make it happen. (Check package json file for this.)
      2. > Using public folder for loading the assets : like favicon, styles, images 
   
   2. **Bundling** : Using webpack to create the bundle for the server JS and this will be used for running the server. Here we have to create webpack.config.js and use it for this purpose.

   3. **Continuous Update & Re-run** : Using nodemon for detecting the changes in the File and restarting the server again rather than doing that manually. Till this time we do not have this integration, server has to be restarted again & again for loading the changes on the UI.

2.  