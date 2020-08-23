import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenricated} from './index';

const PrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render={props => isAuthenricated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/signin', state:{from:props.location}}} />
        )} />
    );
};

export default PrivateRoute;