import React from 'react';
import UserList from "../components/UserList";
import { PATHS } from "../utils/constants";
import HelloWorld from "../components/HelloWorld";
import regeneratorRuntime from "regenerator-runtime"; //needed to save the run-time error for the async/await
import axios from "axios";
import PostList from "../components/PostList";
import Passengers from '../components/Passengers';
import { useParams } from 'react-router-dom';
import Repository from '../components/Repos';

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
        /**
         * Any method needed for loading the data
         */
        loadData: async function () {
            return await axios.get('https://jsonplaceholder.typicode.com/users');
        },
        data_key: 'USER_LIST'
    },
    //List of All the Posts for a user
    {
        path: PATHS.POST_FOR_USER,
        component: PostList,
        seo: {
            title: 'post for the user'
        },
        /**
         * @todo loading of this function has become complicated
         * @param {*} request 
         */
        loadData: async function ({ request, userId = 1 }) {
            // console.log(request.params[0].split('/')[2]);
            // console.log(this.url(userId));
            //@todo why the request.params is not working properly here 
            let url = `https://jsonplaceholder.typicode.com/posts?userId=${request ? request.params[0].split('/')[2] : userId}`;
            return await axios.get(url);
        },
        data_key: ({ request, userId = 1 }) => `POST_LIST_${request ? request.params[0].split('/')[2] : userId}`
    },
    //List of the Airline Passengers
    {
        path: PATHS.PASSENGERS,
        component: Passengers,
        loadData: async function ({ page = 1, size = 50 }) {
            return axios.get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`)
        },
        seo: {
            title: 'Airline passenger list'
        },
        data_key: ({ page = 1, size = 50 }) => `PASSENGERS_${page}_${size}`
    },
    //not found path
    {
        path: PATHS.REPOS,
        component: Repository,
        seo: {
            title: 'Popular respositories.'
        },
        loadData: async function ({ request, language = 'all' }) {
            console.log('Load data called for language inside config.. ', language);
            console.log(request && request.params[0].split('/')[2]);
            return axios.get(`https://api.github.com/search/repositories?q=stars:%3E1+language:${request ? request.params[0].split('/')[2] : language}&sort=stars&order=desc&type=Repositories`);
        },
        data_key: ({ request, language = 'ALL' }) => `LANG_LIST_${(request && request.params[0].split('/')[2]) || language}`
    },
    {
        path: PATHS.NOTFOUND,
        component: () => <div><h1>Page Not Found</h1></div>,
        status: 404,
        seo: {
            title: 'page not found'
        },
    },

];
