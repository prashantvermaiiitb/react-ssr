import React from 'react';
import UserList from "../components/UserList";
import { PATHS } from "../utils/constants";
import HelloWorld from "../components/HelloWorld";
import regeneratorRuntime from "regenerator-runtime"; //needed to save the run-time error for the async/await
import axios from "axios";
import PostList from "../components/PostList";

/**
 * simple JSON object for the Pages that will tell if there is an extra 
 * data that has to be loaded for the Components.
 * @todo "export default config" was giving error. 
 */
export const config = [

    //hello world path
    {
        path: PATHS.HELLO_WORLD,
        exact: true,
        component: HelloWorld,
        seo: {
            title: 'Hello World created using React.createElement!!'
        },
    },
    // {
    //     path: PATHS.HELLO_WORLD_OLD,
    //     component: (request) => {
    //         let { type, subtype } = request.params;
    //         return HelloWorld({ type, subtype });
    //     },
    //     seo: {
    //         title: 'Hello World created using React.createElement!!'
    //     },
    // },
    //user list path
    {
        path: PATHS.USER_LIST,
        exact: true, // this will not be added in case of the Express route matching while you have to use this React-router
        component: UserList,
        seo: {
            title: 'User List'
        },
        url: 'https://jsonplaceholder.typicode.com/users',
        /**
         * Any method needed for loading the data
         */
        loadData: async function (request) {
            return await axios.get(this.url);
        },
    },
    //List of All the Posts for a user
    {
        path: PATHS.POST_FOR_USER,
        component: PostList,
        seo: {
            title: 'post for the user'
        },
        url: (userId) => `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        loadData: async function (request) {
            let { userId = 1 } = request.params
            return await axios.get(this.url(userId));
        },
    },
    //not found path
    {
        path: PATHS.NOTFOUND,
        component: () => <div><h1>Page Not Found</h1></div>,
        status: 404,
        seo: {
            title: 'page not found'
        },
    },

];
