import React from 'react';
import NavBar from './components/NavBar';
import { Switch, Route } from 'react-router-dom';
import { config as routes } from './routes/config';

/**
 * App component common between server and client
 */
const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                {routes.map(({ path, exact, component: C, ...rest }) => <Route path={path} exact={exact} key={path} render={(props) => (<C {...props} {...rest} />)} />)}
            </Switch>
        </div>
    );
}

export default App;