/**
 * User List 
 * @param {*} data : for loading user data after the network
 */
const UserList = ({ data }) => {
    
    //@todo check for the data.user presence ???
    
    let userList = data.map((user) => {
        return (
            `<ul class="user-list">
                <li>
                    <span class="label">Name</span>
                    <span class="value">${user.name}</span>
                </li>
                <li>
                    <span class="label">UserName</span>
                    <span class="value">${user.username}</span>
                </li>
                <li>
                    <span class="label">Email</span>
                    <span class="value">${user.email}</span>
                </li>
            </ul>`
        );
    });
    if (userList !== null) {
        return userList.join('');
    }
    return `No Content found`;
}

export default UserList;