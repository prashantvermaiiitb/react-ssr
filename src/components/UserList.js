import { PATHS } from "../utils/constants";

/**
 * User List 
 * @param {*} data : for loading user data after the network
 */
const UserList = ({ data }) => {
    let response = `<h2>No Users Found.</h2>`;
    if (Array.isArray(data) && data.length > 0) {
        response = data.map((user) => {
            return (
                `<ul class="user-list">
                    <li>
                        <span class="label">Name: </span>
                        <span class="value">${user.name}</span>
                    </li>
                    <li>
                        <span class="label">UserName: </span>
                        <span class="value">${user.username}</span>
                    </li>
                    <li>
                        <span class="label">Email: </span>
                        <span class="value">${user.email}</span>
                    </li>
                    <li>
                        <span class="label"><a href="${PATHS.COMMENT_LIST}${user.id}">Comment(s)</a></span>
                    </li>
                </ul>`
            );
        }).join('');
    }
    return response;
}

export default UserList;