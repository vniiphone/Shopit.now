import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import AddProducts from './AddProduct/AddProducts';
import AdminContainer from './Dashboard/AdminContainer';
import AdminProducts from './AdminProduct/AdminProducts';
import AdminProtectedRoute from "../Route/AdminProtectedRoute";
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {faArrowLeft,faArrowRight,faBars} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notifications from './Dashboard/Orders/Notifications';
import AdminAdvertisement from './Advertisements/AdminAdvertisement';
import Settings from './Settings/Settings';

class AdminContainerWrap extends Component {

    render() {
        const {handleSmallDashboard,handleDashboard,dashboardToggle,handleSelectedScreen,handleUserSettings}=this.props;
        return (
            <div className="role-admin-right"> 
                <div className="role-admin-nav">
                    <FontAwesomeIcon onClick={handleSmallDashboard} className="small-screen-dashboard" icon={faBars}/>
                    {!dashboardToggle &&<FontAwesomeIcon onClick={handleDashboard} icon={faArrowLeft} className="dashboardToggle-left"/>}
                    {dashboardToggle &&<FontAwesomeIcon onClick={handleDashboard} icon={faArrowRight} className="dashboardToggle-right"/>}
                    <div className="role-admin-nav-right">
                        <Notifications/>
                        <div>
                            <FontAwesomeIcon icon={faUser} onClick={handleUserSettings} />
                        </div>
                    </div>
                    
                </div>
                <Switch>
                    <AdminProtectedRoute handleSelectedScreen={handleSelectedScreen} path="/admin/add-product" Component={AddProducts}/>
                    <AdminProtectedRoute handleSelectedScreen={handleSelectedScreen} path="/admin/products" Component={AdminProducts}/>
                    <AdminProtectedRoute handleSelectedScreen={handleSelectedScreen} path="/admin/advertisement" Component={AdminAdvertisement}/>
                    <AdminProtectedRoute handleSelectedScreen={handleSelectedScreen} path="/admin/settings" Component={Settings}/>
                    <AdminProtectedRoute handleSelectedScreen={handleSelectedScreen} path="/admin" Component={AdminContainer}/>
                </Switch>
            </div>
        );
    }
}

export default AdminContainerWrap;