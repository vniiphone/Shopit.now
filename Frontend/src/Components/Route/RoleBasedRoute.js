import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import HomeContainer from '../../App Containers/HomeContainer';
import {rolesBasedAuth} from '../../services/LoginReg';

class RoleBasedRoute extends Component {

    render() {
        const {user}=this.props;
        return (
            <Route path="/" render={(props)=> {
                if(rolesBasedAuth()) 
                    return <Redirect to="/admin" /> 
                return <HomeContainer user={user} {...props}/>
            }}/>
        );
    }
}

export default RoleBasedRoute;