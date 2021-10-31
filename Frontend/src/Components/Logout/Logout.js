import React, { Component } from 'react';

class Logout extends Component {
    
    render() {
        const {loggingOut,handleLogout,logoutDisplay}=this.props;
        return (
            <div className={`admin-logout-now-container ${logoutDisplay?'display-logout-container':''}`}>
                <div className="logout-btns">
                    <h5>Are you sure you want to logout?</h5>
                    <div>
                        <button onClick={loggingOut}>Logout</button>
                        <button onClick={handleLogout}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Logout;