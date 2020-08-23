import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenricated} from './index';

const AdminRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render={props => isAuthenricated() && isAuthenricated().user.role === 1 ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/signin', state:{from:props.location}}} />
        )} />
    );
};

export default AdminRoute;