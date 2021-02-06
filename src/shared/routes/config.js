import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';


import UserList from "../components/UserList";
import TemplateFactory from "../templates";
import { PATHS } from "../utils/constants";
import HelloWorld from "../components/HelloWorld";
import regeneratorRuntime from "regenerator-runtime"; //needed to save the run-time error for the async/await
import axios from "axios";
import PostList from "../components/PostList";
import NavBar from '../components/NavBar';

/**
 * simple JSON object for the Pages that will tell if there is an extra 
 * data that has to be loaded for the Components.
 * @todo "export default config" was giving error. 
 */
const config = [

    //hello world path
    {
        path: PATHS.HELLO_WORLD,
        component: HelloWorld,
        seo: {
            title: 'Hello World created using React.createElement!!'
        },
        //@todo refactoring needed here 
        generateHtml: async function () {
            let templateGenerator = TemplateFactory.getTemplate(this.path);
            let html = ReactDOMServer.renderToString(<div><NavBar />{React.createElement('h1', null, 'Hello world from Templates created using React.createElement()!!')}</div>), seo = this.seo;
            return templateGenerator({ html, seo });
        }
    },
    //user list path
    {
        path: PATHS.USER_LIST,
        component: UserList,
        seo: {
            title: 'User List'
        },
        url: 'https://jsonplaceholder.typicode.com/users',
        /**
         * Any method needed for loading the data
         */
        loadData: async function () {
            return await axios.get(this.url);
        },
        /**
         * Inclusion of the promise or async/await here for the template.
         * @todo status handling should also be done here 
         */
        generateHtml: async function () {
            // console.log(this.loadData());
            let data = await this.loadData();
            let templateGenerator = TemplateFactory.getTemplate(this.path);
            let MyComponent = this.component;
            let html = ReactDOMServer.renderToString(<div><NavBar /><MyComponent data={data.data} /></div>), seo = this.seo;
            return templateGenerator({ html, seo });
        }
    },
    //List of All the Posts for a user
    {
        path: PATHS.POST_FOR_USER,
        component: PostList,
        seo: {
            title: 'post for the user'
        },
        url: (userId) => `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        loadData: async function (userId) {
            return await axios.get(this.url(userId));
        },
        generateHtml: async function ({ request }) {
            let data = await this.loadData(request.params.userId || 1);
            // console.log(data); // @todo including morgan as the logger here
            let templateGenerator = TemplateFactory.getTemplate(this.path);
            let MyComponent = this.component;
            let html = ReactDOMServer.renderToString(<div><NavBar /><MyComponent data={data.data} /></div>), seo = this.seo;
            return templateGenerator({ html, seo });
        }
    },
    //not found path
    {
        path: PATHS.NOTFOUND,
        status: 404,
        seo: {
            title: 'page not found'
        },
        generateHtml: async function () {
            let templateGenerator = TemplateFactory.getTemplate(this.path);
            let html = ReactDOMServer.renderToString(<div><NavBar />{`<h1>Page Not Found</h1>`}</div>), seo = this.seo;
            return templateGenerator({ html, seo });
        }
    },

];

export default config;