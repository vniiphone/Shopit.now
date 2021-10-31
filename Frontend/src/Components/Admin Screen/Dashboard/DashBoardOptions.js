import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class DashBoardOptions extends Component {
    state = {  }
    render() {
        const {name,fa,dashboardToggle,url, selectedScreen,handleSmallDashboard}= this.props;
        return (
            <Link to={url} onClick={ handleSmallDashboard} className={`dashboard-each-option ${selectedScreen===name && name!=='Logout'?"selected-screen":""}`}>
                    <div>
                        <FontAwesomeIcon className={!dashboardToggle?"":"scale-svg"} icon={fa}/>
                        <h5 className={!dashboardToggle?"":"hide-it"}>{name}</h5>
                    </div> 

            </Link>
        );
    }
}

export default DashBoardOptions; 