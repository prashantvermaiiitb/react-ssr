import React, { useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import { STATE_KEY } from '../utils/constants';

const Passenger = ({ user }) => {
    return (
        <ul>
            <li key={user._id}>{user.name}</li>
            <li>
                <span>{user.airline.name}</span>
                <span><img src={user.airline.logo} /></span>
                <span>{user.airline.website}</span>
            </li>
        </ul>
    );
}

const Passengers = ({ staticContext, data_key }) => {

    const { params = {} } = useRouteMatch();
    const { page = 1, size = 50 } = params;
    // console.log(staticContext);
    // console.log(__isBrowser__);
    let data = {};
    if (__isBrowser__) {
        //will be loaded on the client end and being set from the server 
        if (window && typeof window === 'object') {
            data = window[STATE_KEY][data_key(page, size)].data; // this key has to be proper else WARNING will be there with blank page
            // if we delete this then we need to have the data loading to be done in mounting again
            // if we do not delete this then this will be loaded from the window again so we can have it but also we have to ensure that it has different key name then the other components to avoid conflict on the client end.
            // delete window[STATE_KEY][data_key];
        }
    } else {
        data = staticContext.data.data; // will be loading data on the server
    }
    console.log('user Data', data);

    const [users, setUsers] = useState(data);
    const [loading, setLoading] = useState(!(Array.isArray(data) && data.length > 0));

    if (loading) {
        return <h2>Loading Passenger List...</h2>;
    }

    return users.map((user, index) => <Passenger user={user} />)
}

export default Passengers;