/**
 * Navigation Bar component for the website
 * This will have the links for the paths that are being supported on the page.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
    { text: 'Home', to: '/' },
    { text: 'Hello World !! (react.createElement()/template)', to: '/hello/1/tmpl' },
    { text: 'Hello World !! (react.createElement()/jsx)', to: '/hello/1/jsx' },
    { text: 'Hello World !! (react.createElement()/react.createElement())', to: '/hello/1/react' },
    { text: 'Hello World !! (Triangle brackets/template)', to: '/hello/2/tmpl' },
    { text: 'Hello World !! (Triangle brackets/jsx)', to: '/hello/2/jsx' },
    { text: 'Hello World !! (Triangle brackets/react.createElement())', to: '/hello/2/react' },
    { text: 'Users', to: '/users' }
];
const NavBar = () => {
    return (
        <ul style={{ listStyle: "none" }}>
            {links.map((link, index) => {
                return (
                    <li key={index}>
                        <NavLink activeStyle={{ fontWeight: 'bold' }} to={link.to}>{link.text}</NavLink>
                    </li>
                );
            })}
            {/* <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/hello/1/tmpl">Hello World !! (react.createElement()/template)</NavLink></li>
            <li><NavLink to="/hello/1/jsx">Hello World !! (react.createElement()/jsx)</NavLink></li>
            <li><NavLink to="/hello/1/react">Hello World !! (react.createElement()/react.createElement())</NavLink></li>
            <li><NavLink to="/hello/2/tmpl">Hello World !! (Triangle brackets/template)</NavLink></li>
            <li><NavLink to="/hello/2/jsx">Hello World !! (Triangle brackets/jsx)</NavLink></li>
            <li><NavLink to="/hello/2/react">Hello World !! (Triangle brackets/react.createElement())</NavLink></li>
            <li><NavLink to="/users">Users</NavLink></li> */}
        </ul>
    );
}

export default NavBar;