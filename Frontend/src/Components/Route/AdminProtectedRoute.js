import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {getCurrentUser,rolesBasedAuth} from '../../services/LoginReg';

class AdminProtectedRoute extends Component {
    
    render() {
        const user=getCurrentUser();
        const {path,Component, handleSelectedScreen}=this.props;
        if(!rolesBasedAuth()) return <Redirect to="/"/>
        return (
            <Route path={path} 
                render={props=>{if(!user) return <Redirect to="/login"/>
            return <Component  handleSelectedScreen={ handleSelectedScreen} {...props}/>
        }}/>
        )}
}

export default AdminProtectedRoute;