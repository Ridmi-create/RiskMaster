import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleTabClick = (tab) => {
    setActiveTab(tab);
    };
  return (
    <div className="wrapper">
    <nav id="sidebar">
      <ul class="list-unstyled components">
        <li className={activeTab === 'dashboard' ? 'active' : ''}>
          <a href="#" onClick={() => handleTabClick('dashboard')}><i class="bi bi-columns-gap"></i>Dashboard</a>
        </li>
        <li className={activeTab === 'userManagement' ? 'active' : ''}>
          <a href="#" onClick={() => handleTabClick('userManagement')}><i class="bi bi-people-fill"></i>User Management</a>
        </li>
        <li className={activeTab === 'departmentManagement' ? 'active' : ''}> 
          <a href="#" onClick={() => handleTabClick('departmentManagement')}><i class="bi bi-building"></i>Department Mgmt.</a>
        </li>
      </ul>
    </nav>
    <div id="content">
        {activeTab === 'dashboard' && (
          <div>
          <div>
            <h3>Dashboard</h3>
            <hr />
          </div>
          <div>
            <h5>Users</h5>
          </div>
          <div className="content-actions">
            <button className="btn btn-primary">Add New User</button>
          </div>
        </div>
        )}
        {activeTab === 'userManagement' && (
          <div>
            <h1>User Management Content</h1>
            <p>This is the content for the User Management tab.</p>
          </div>
        )}
        {activeTab === 'departmentManagement' && (
          <div>
            <h1>Department Management Content</h1>
            <p>This is the content for the Department Management tab.</p>
          </div>
        )}
    </div>
  </div>
  );
};

export default Sidebar;