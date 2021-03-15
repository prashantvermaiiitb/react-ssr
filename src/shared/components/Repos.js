import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { STATE_KEY } from '../utils/constants';
import './repo.css';
/**
 * Component for the respository show-case.
 * Loading the data for the Page.
 */

const RepoDetails = ({ repo }) => {
    let { id, name, html_url, description, owner, homepage, stargazers_count } = repo;
    return (
        <tr id={id}>
            <td style={{ width: '10%' }}><a href={html_url}>{name}</a></td>
            <td style={{ width: '30%' }}><span className="description">{description}</span></td>
            <td style={{ width: '5%' }}><img src={owner.avatar_url} width="40" height="40" /></td>
            <td style={{ width: '10%' }}><span>{stargazers_count}</span></td>
            <td style={{ width: '10%' }}><a href={homepage}>Go To Home</a></td>
        </tr>
    );
};

const Repository = ({ staticContext, data_key, loadData }) => {
    let { language } = useParams();
    let history = useHistory();
    console.log(history);
    let data = {};
    if (__isBrowser__) {
        //will be loaded on the client end and being set from the server 
        if (window && typeof window === 'object') {
            data = window[STATE_KEY][data_key({ language })]; // this key has to be proper else WARNING will be there with blank page
            // if we delete this then we need to have the data loading to be done in mounting again
            // if we do not delete this then this will be loaded from the window again so we can have it but also we have to ensure that it has different key name then the other components to avoid conflict on the client end.
            // delete window[STATE_KEY][data_key];
        }
    } else {
        data = staticContext.data; // will be loading data on the server
    }
    // console.log('data...', data.items.length);

    const [repos, setRepos] = useState(data && data.items || []);

    /**
     * Making arrangements so that this should not be called on the first page load from the server again.
     */
    const [loading, setLoading] = useState(!(Array.isArray(repos) && repos.length > 0));


    /**
     * will be used when loading the component on the client side 
     * UserList -> Comments -> click on Navigation for UserList
     */
    useEffect(() => {
        console.log('useEffect Repos called');

        // console.log(`repos..`,repos);
        // will be used on the client end when coming back from the PostList
        // if (!(Array.isArray(repos) && repos.length > 0)) {
        let tmpRepos = window[STATE_KEY][data_key({ language })];
        // console.log(`tmprepository...`, tmpRepos);
        // console.log(`tmprepository...`, typeof (tmpRepos) === 'undefined');
        // console.log(`data to be loaded for inside component ..`, language);

        if (!tmpRepos) {
            setLoading(true);// this is being done for Component DidUpdate @todo componentMounted checked 
            loadData({ language }).then((response) => {
                let data = response.data;
                console.log('print data ', data);
                if (data && Array.isArray(data.items) && data.items.length > 0) {
                    window[STATE_KEY][data_key({ language })] = data;//saving userlist for the next navigation load
                    const repos = data.items;
                    setRepos(repos);
                    setLoading(false);
                }
            })
        } else {
            setRepos(tmpRepos.items); //after component did mount once it will be used for all the other request.
            setLoading(false);
        }
        // }
        return () => {
            // cleanup
            // console.log(`Clean up to be done for the userlist`);
        }
    }, [language]);


    /**
    * When data is not there.
    * This will not be there on the 1st page load
    * This will be there when on the client side we are coming back on this component.
    */
    if (loading) {
        return <h2>Loading {language || 'Popular'} Repo List...</h2>;
    }
    return (
        <div>
            <ul>
                <li><NavLink to={'/repos/javascript'}>JS Repo Home</NavLink></li>
                <li><NavLink to={'/repos/ruby'}>Ruby Repo Home</NavLink></li>
                <li><NavLink to={'/repos/python'}>Python Repo Home</NavLink></li>
            </ul>
            <button onClick={() => { history.push('/repos/ruby'); }}>See Ruby Repo</button>
            <table className="mytable">
                <thead>
                    <tr>
                        <td style={{ width: '10%' }}>Name</td>
                        <td style={{ width: '30%' }}><span className="description">Description</span></td>
                        <td style={{ width: '5%' }}>Avatar</td>
                        <td style={{ width: '10%' }}><span style={{ fontWeight: 'bold' }}>Stars Count: </span></td>
                        <td style={{ width: '10%' }}>Home Page Link</td>
                    </tr>
                </thead>
                <tbody>
                    {repos.map((repo, index) => <RepoDetails key={index} repo={repo} />)}
                </tbody>
            </table>
        </div>
    )
}

export default Repository