import React from 'react';
/**
 * List of all the Posts for the User.
 */
const PostList = ({ data }) => {
    // console.log(data);
    //@todo ideally will be using history api for this pushing back

    let response = [<a style={{ marginLeft: 10 }} href={"/users"}>Go Back</a>];

    if (Array.isArray(data) && data.length > 0) {
        response.push(data.map((post) => {
            return <ul class="post-list"><li>
                <h3 class="label">${post.title}</h3>
                <span class="value">${post.body}</span>
            </li></ul>;
        }));
    } else {
        response.push(<div style="margin-left:10px"><h3>No Post for this user found.</h3></div>);
    }

    return response;

}

export default PostList;