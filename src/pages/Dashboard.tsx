import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="settings">Settings</Link></li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default Dashboard; 