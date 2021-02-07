import React, { useState, useEffect } from 'react';
import { STATE_KEY } from '../utils/constants';
import { Link, useRouteMatch } from 'react-router-dom';
/**
 * List of all the Posts for the User.
 */
const PostList = ({ staticContext, data_key, loadData }) => {

    let { params } = useRouteMatch();
    let { userId } = params;
    // console.log('userid', userId);
    // console.log(data);
    //@todo ideally will be using history api for this pushing back
    let data = {};
    if (__isBrowser__) {
        //will be loaded on the client end and being set from the server 
        if (window && typeof window === 'object') {
            data = window[STATE_KEY][data_key({ userId })];
            // if this key is not being deleted then it will clash with UserList 
            //as we are having the name of the global data source being set from the server 
            //is same for both which is "initial_data", so we have to form another object. 
            // delete window[STATE_KEY][data_key(userId)];
        }
    } else {
        data = staticContext.data; // will be loading data on the server
    }

    const [loading, setLoading] = useState(!(Array.isArray(data) && data.length > 0));
    const [postList, setPostList] = useState(data);

    useEffect(() => {
        console.log('useEffect Postlist called');

        // console.log(`users..`,users);

        // will be used on the client end when coming back from the PostList
        if (!(Array.isArray(postList) && postList.length > 0)) {
            setLoading(true);
            loadData({ userId }).then((data) => {
                if (data && Array.isArray(data.data) && data.data.length > 0) {
                    // console.log(data.data);
                    const postList = data.data;
                    window[STATE_KEY][data_key({ userId })] = postList;//saving userlist for the next navigation load
                    setPostList(postList);
                    setLoading(false);
                }
            })
        }
        return () => {
            //cleanup
        };
    }, [postList]);

    //key for this has to be there because this is the 1st child of the response [].
    //With <a> this will be page loading rather than making request at the client end.
    let response = [
        <a key={-1} style={{ marginLeft: 10 }} href={"/users"}>Go Back to Server</a>,
        <Link key={-2} style={{ marginLeft: 10 }} to={"/users"}>Go Back to Client</Link>
    ];
    if (loading) {
        response.push(<div key={-3} style={{ marginLeft: 10 }}><h3>Loading Post for this User-{userId}.</h3></div>);
        return response;
    }
    response.push(postList.map((post, index) => {
        return (<ul key={index} className="post-list">
            <li key={`${index}-${post.title}`}>
                <h3 className="label">${post.title}</h3>
                <span className="value">${post.body}</span>
            </li>
        </ul>);
    }));

    return response;

}

export default PostList;