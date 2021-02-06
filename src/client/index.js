import React from 'react';
import ReactDOM from 'react-dom';
import { APP_ID } from '../shared/utils/constants';
import App from '../shared';
import { BrowserRouter as Router } from 'react-router-dom';

/**
 * This will be the entry point for the client
 * Here react will be preserving the DOM and attach the event listeners.
 */
ReactDOM.hydrate(<Router><App /></Router>, document.getElementById(APP_ID));