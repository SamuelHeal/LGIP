import React from "react";

import { Link } from "react-router-dom";

import "./Dashboard.css";
import Auth from "../utils/auth";
import Landing from "../Landing/Landing";

function Dashboard() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className='dashboardContainer'>
      <div className='navBar'>
        <h1>Legends Investment Groups</h1>
        {Auth.loggedIn() ? (
          <a className='logoutButton' onClick={logout}>
            Logout
          </a>
        ) : (
          <Link className='logoutButton' to='/login'>
            Login/Register
          </Link>
        )}
      </div>
      {Auth.loggedIn() ? (
        <Landing />
      ) : (
        <div className='dashboardBody'>
          <h5>You must be logged in to view this information</h5>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
