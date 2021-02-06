/**
 * Navigation Bar component for the website
 * This will have the links for the paths that are being supported on the page.
 */
import React from 'react';
const NavBar = () => {
    return (
        <ul style={{ listStyle: "none" }}>
            <li><a href="/">Home</a></li>
            <li><a href="/hello/1/tmpl">Hello World !! (react.createElement()/template)</a></li>
            <li><a href="/hello/1/jsx">Hello World !! (react.createElement()/jsx)</a></li>
            <li><a href="/hello/1/react">Hello World !! (react.createElement()/react.createElement())</a></li>
            <li><a href="/hello/2/tmpl">Hello World !! (Triangle brackets/template)</a></li>
            <li><a href="/hello/2/jsx">Hello World !! (Triangle brackets/jsx)</a></li>
            <li><a href="/hello/2/react">Hello World !! (Triangle brackets/react.createElement())</a></li>
            <li><a href="/users">Users</a></li>
        </ul>
    );
}

export default NavBar;