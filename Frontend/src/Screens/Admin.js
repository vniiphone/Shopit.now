import React, { Component } from 'react';
import AdminContainerWrap from '../Components/Admin Screen/AdminContainerWrap';
import Navigation from '../Components/Admin Screen/Dashboard/Navigation';

import '../css/admin.css';

class Admin extends Component {

    render() {
        const {handleUserSettings,handleLogout,dashboardToggle,smallScreenDashboard,selectedScreen,handleDashboardToggle,handleSelectedScreen,handleSmallScreenDashboard}=this.props;
        return (
            <div className="role-admin-container">
                <Navigation 
                    selectedScreen={selectedScreen} 
                    handleSmallDashboard={handleSmallScreenDashboard} 
                    dashboardToggle={dashboardToggle} 
                    smallDashboard={smallScreenDashboard}
                    handleLogout={handleLogout}
                />

                <AdminContainerWrap 
                    handleSelectedScreen={handleSelectedScreen} 
                    handleSmallDashboard={handleSmallScreenDashboard} 
                    smallDashboard={smallScreenDashboard} 
                    dashboardToggle={dashboardToggle} 
                    handleDashboard={handleDashboardToggle}
                    handleUserSettings={handleUserSettings}
                />
            </div>
        )
    }
}

export default Admin;