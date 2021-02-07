import React, { useEffect, useState } from 'react';
import { STATE_KEY } from '../utils/constants';
import { Link } from 'react-router-dom';
import Loader from '../utils/Loader';
/**
 * User List showing the list of the user.
 * @param {*} data : for loading user data after the network
 */
const UserList = ({ staticContext, data_key, loadData }) => {
    // console.log(staticContext);
    // console.log(__isBrowser__);
    let data = {};
    if (__isBrowser__) {
        //will be loaded on the client end and being set from the server 
        if (window && typeof window === 'object') {
            data = window[STATE_KEY][data_key]; // this key has to be proper else WARNING will be there with blank page
            // if we delete this then we need to have the data loading to be done in mounting again
            // if we do not delete this then this will be loaded from the window again so we can have it but also we have to ensure that it has different key name then the other components to avoid conflict on the client end.
            // delete window[STATE_KEY][data_key];
        }
    } else {
        data = staticContext.data; // will be loading data on the server
    }
    /**
     * Making arrangements so that this should not be called on the first page load from the server again.
     */
    const [loading, setLoading] = useState(!(Array.isArray(data) && data.length > 0));
    /**
     * This is being used for client rendering support of the component
     */
    const [users, setUsers] = useState(data);

    /**
     * will be used when loading the component on the client side 
     * UserList -> Comments -> click on Navigation for UserList
     */
    useEffect(() => {
        console.log('useEffect UserList called');

        // console.log(`users..`,users);

        // will be used on the client end when coming back from the PostList
        if (!(Array.isArray(users) && users.length > 0)) {
            setLoading(true);
            loadData().then((data) => {
                if (data && Array.isArray(data.data) && data.data.length > 0) {
                    // console.log(data.data);
                    const users = data.data;
                    window[STATE_KEY][data_key] = users;//saving userlist for the next navigation load
                    setUsers(users);
                    setLoading(false);
                }
            })
        }
        return () => {
            // cleanup
            // console.log(`Clean up to be done for the userlist`);
        }
    }, [users]);

    /**
     * When data is not there.
     * This will not be there on the 1st page load
     * This will be there when on the client side we are coming back on this component.
     */
    if (loading) {
        return <h2>Loading User List...</h2>;
    }

    return users.map((user, index) => {
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
                    {/* With <a> tag this will be loading the page from server while <Link> will be asking client to handle that */}
                    <span style={{ display: 'block' }} className="label"><a href={`/users/${user.id}/posts`}>Load Post(s) from Server</a></span>
                    <span className="label"><Link to={`/users/${user.id}/posts`}>Load Post(s) from Client</Link></span>
                </li>
            </ul>
        );
    });
}

export default UserList;

// let UserListLoader = Loader(UserList);
// <UserListLoader/>
// export default Loader(UserList);
