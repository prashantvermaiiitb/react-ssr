import UserList from "../components/UserList";
import TemplateFactory from "../templates";
import { PATHS } from "../utils/constants";
import HelloWorld from "../components/HelloWorld";
import regeneratorRuntime from "regenerator-runtime"; //needed to save the run-time error for the async/await
import axios from "axios";
import { response } from "express";
import CommentList from "../components/CommentList";
import PostList from "../components/PostList";

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
            title: 'Hello World!!'
        },
        //@todo refactoring needed here 
        generateHtml: async function () {
            let templateGenerator = TemplateFactory.getTemplate(this.path);
            let html = `<h1>Hello world from Templates !!</h1>`, seo = this.seo;
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
            let html = this.component(data), seo = this.seo;
            // console.log(html);//@todo use morgan as the logger here
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
        loadData: async function () {
            return await axios.get(this.url);
        },
        generateHtml: async function () {
            // console.log(this.loadData());
            let data = await this.loadData();
            let templateGenerator = TemplateFactory.getTemplate(this.path);
            let html = this.component(data), seo = this.seo;
            // console.log(html);//@todo use morgan as the logger here
            return templateGenerator({ html, seo });
        }
    },
    // {
    //     path: PATHS.POST_FOR_USER,
    //     component: '',
    //     seo: {
    //         title: ''
    //     }
    // },
    //list of all the posts 
    // {},
    //comment list for a particular post for a user
    //not found path
    {
        path: PATHS.NOTFOUND,
        status: 404,
        seo: {
            title: 'page not found'
        },
        generateHtml: async function () {
            let templateGenerator = TemplateFactory.getTemplate(this.path);
            let html = `<h1>Page Not Found</h1>`, seo = this.seo;
            return templateGenerator({ html, seo });
        }
    },

];

export default config;