import UserList from "../components/UserList";
import TemplateFactory from "../templates";
import { PATHS } from "../utils/constants";
import HelloWorld from "../components/HelloWorld";

/**
 * simple JSON object for the Pages that will tell if there is an extra 
 * data that has to be loaded for the Components.
 * @todo "export default config" was giving error. 
 */
const config = [
    {
        path: PATHS.NOTFOUND,
        status: 404,
        seo: {
            title: 'page not found'
        },
        generateHtml: function () {
            let templateGenerator = TemplateFactory.getTemplate(this.path);
            let html = `<h1>Page Not Found</h1>`, seo = this.seo;
            return templateGenerator({ html, seo });
        }
    },
    {
        path: PATHS.HELLO_WORLD,
        component: HelloWorld,
        seo: {
            title: 'Hello World!!'
        },
        //@todo refactoring needed here 
        generateHtml: function () {
            let templateGenerator = TemplateFactory.getTemplate(this.path);
            let html = `<h1>Hello world from Templates !!</h1>`, seo = this.seo;
            return templateGenerator({ html, seo });
        }
    },
    {
        path: PATHS.USER_LIST,
        component: UserList,
        seo: {
            title: 'User List'
        },
        /**
         * Any method needed for loading the data
         */
        loadData: () => {
            // https://jsonplaceholder.typicode.com/users/
            return {
                data: [
                    {
                        id: 1,
                        name: "Leanne Graham",
                        username: "Bret",
                        email: "Sincere@april.biz",
                    },
                    {
                        id: 2,
                        name: "Ervin Howell",
                        username: "Antonette",
                        email: "Shanna@melissa.tv",
                    },
                    {
                        id: 3,
                        name: "Clementine Bauch",
                        username: "Samantha",
                        email: "Nathan@yesenia.net",
                    }
                ]
            }
        },
        /**
         * Inclusion of the promise or async/await here for the template.
         */
        generateHtml: function () {
            // console.log(this.loadData());
            let templateGenerator = TemplateFactory.getTemplate(this.path);
            let html = this.component(this.loadData()), seo = this.seo;
            return templateGenerator({ html, seo });
        }
    }
];

export default config;