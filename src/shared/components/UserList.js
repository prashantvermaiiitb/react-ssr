import React from 'react';
import { INITIAL_DATA } from '../utils/constants';
/**
 * User List showing the list of the user.
 * @param {*} data : for loading user data after the network
 */
const UserList = ({ staticContext }) => {
    // console.log(staticContext);
    // console.log(__isBrowser__);
    let data = {}, response = <h2>No Users Found.</h2>;
    if (__isBrowser__) {
        //will be loaded on the client end and being set from the server 
        if (window && typeof window === 'object') {
            data = window[INITIAL_DATA];
            delete window[INITIAL_DATA];
        }
    } else {
        data = staticContext.data; // will be loading data on the server
    }
    if (Array.isArray(data) && data.length > 0) {
        response = data.map((user, index) => {
            return (
                <ul key={index} className="user-list">
                    <li>
                        <span className="label">Name: </span>
                        <span className="value">{user.name}</span>
                    </li>
                    <li>
                        <span className="label">UserName: </span>
                        <span className="value">{user.username}</span>
                    </li>
                    <li>
                        <span className="label">Email: </span>
                        <span className="value">{user.email}</span>
                    </li>
                    <li>
                        <span className="label"><a href={`/users/${user.id}/posts`}>Post(s)</a></span>
                    </li>
                </ul>
            );
        });
    }
    return response;
}

export default UserList;