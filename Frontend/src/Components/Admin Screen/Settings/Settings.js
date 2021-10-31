import React, { Component } from 'react';
import UserDetails from './UserDetails';
import '../../../css/settings.css';
import PasswordChange from './PasswordChange';
import DeleteAccount from './DeleteAccount';

class Settings extends Component {
    state = {  }

    componentDidMount(){
        this.props.handleSelectedScreen("Settings");
    }

    render() {
        return (
            <div className="admin-settings-container">
                <div className="admin-settings-sub-container">
                    <UserDetails/>
                    <PasswordChange/>
                    <DeleteAccount/>
                </div>
            </div>
        );
    }
}

export default Settings;