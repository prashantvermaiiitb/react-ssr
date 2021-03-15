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
    { text: 'Users', to: '/users' },
    { text: 'Passengers', to: '/passengers' },
    { text: 'Repo Home', to: '/repos' }
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
        </ul>
    );
}

export default NavBar;