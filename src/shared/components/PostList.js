import React from 'react';
import { INITIAL_DATA } from '../utils/constants';
/**
 * List of all the Posts for the User.
 */
const PostList = ({ staticContext }) => {
    // console.log(data);
    //@todo ideally will be using history api for this pushing back
    let data = {};
    if (__isBrowser__) {
        //will be loaded on the client end and being set from the server 
        if (window && typeof window === 'object') {
            data = window[INITIAL_DATA];
            delete window[INITIAL_DATA];
        }
    } else {
        data = staticContext.data; // will be loading data on the server
    }

    let response = [<a key={-1} style={{ marginLeft: 10 }} href={"/users"}>Go Back</a>];

    if (Array.isArray(data) && data.length > 0) {
        response.push(data.map((post, index) => {
            return (
                <ul key={index} className="post-list">
                    <li key={`${index}-${post.title}`}>
                        <h3 className="label">${post.title}</h3>
                        <span className="value">${post.body}</span>
                    </li>
                </ul>
            );
        }));
    } else {
        response.push(<div style={{ marginLeft: 10 }}><h3>No Post for this user found.</h3></div>);
    }

    return response;

}

export default PostList;