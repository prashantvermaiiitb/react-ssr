import React from 'react';
/**
 * This is a high order function giving functionality for the loading experience
 */
const Loader = (Component, loading) => {
    if (loading) {
        return <h1>Loading More data... Please wait..</h1>
    }
    return (props) => {
        return <Component {...props} />
    }
}

export default Loader;