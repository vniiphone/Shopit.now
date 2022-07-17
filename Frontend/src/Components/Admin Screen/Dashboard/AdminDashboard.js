import React, { Component } from "react";
import APP_LOGO_WHITE from "../../../Icons/app-logo-white.svg";
import logo from "../../../Icons/logo-now";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSignOutAlt,
  faHome,
  faPlusCircle,
  faListAlt,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";
import DashBoardOptions from "./DashBoardOptions";

class AdminDashboard extends Component {
  render() {
    const {
      handleLogout,
      dashboardToggle,
      selectedScreen,
      handleSmallDashboard,
    } = this.props;
    return (
      <div className={`dashboard`}>
        <div>
          <div className="admin-logo-container">
            <span className={`${!dashboardToggle ? "" : "hide-it"}`}>
              <img src={APP_LOGO_WHITE} alt="admin screen logo" />
            </span>
            <span
              className={`${!dashboardToggle ? "now-logo-hide" : "now-logo"}`}
            >
              {logo}
            </span>
          </div>
          <div className="dashboard-admin-options">
            <DashBoardOptions
              handleSmallDashboard={handleSmallDashboard}
              selectedScreen={selectedScreen}
              url="/"
              dashboardToggle={dashboardToggle}
              name="Dashboard"
              fa={faHome}
            />
            <DashBoardOptions
              handleSmallDashboard={handleSmallDashboard}
              selectedScreen={selectedScreen}
              url="/admin/products"
              dashboardToggle={dashboardToggle}
              name="Products"
              fa={faListAlt}
            />
            <DashBoardOptions
              handleSmallDashboard={handleSmallDashboard}
              selectedScreen={selectedScreen}
              url="/admin/add-product"
              dashboardToggle={dashboardToggle}
              name="Add Product"
              fa={faPlusCircle}
            />
            <DashBoardOptions
              handleSmallDashboard={handleSmallDashboard}
              selectedScreen={selectedScreen}
              url="/admin/advertisement"
              dashboardToggle={dashboardToggle}
              name="Advertisement"
              fa={faBullhorn}
            />
          </div>
        </div>
        <div className="nav-btn">
          <DashBoardOptions
            handleSmallDashboard={handleSmallDashboard}
            selectedScreen={selectedScreen}
            url="/admin/settings"
            dashboardToggle={dashboardToggle}
            name="Settings"
            fa={faCog}
          />
          <div onClick={handleLogout} className={`dashboard-each-option`}>
            <div>
              <FontAwesomeIcon
                className={!dashboardToggle ? "" : "scale-svg"}
                icon={faSignOutAlt}
              />
              <h5 className={!dashboardToggle ? "" : "hide-it"}>Logout</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
