import React from 'react';
/**
 * User List showing the list of the user.
 * @param {*} data : for loading user data after the network
 */
const UserList = ({ data }) => {
    let response = <h2>No Users Found.</h2>;
    if (Array.isArray(data) && data.length > 0) {
        response = data.map((user) => {
            return (
                <ul className="user-list">
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