import React from 'react';
import Sidebar from '../components/Sidebar';
import AdminUserManager from '../components/AdminUserManager.js';
import '../css/AdminLayout.css';

const AdminUserPage = () => (
  <div className="admin-layout">
    <Sidebar />
    <div className="admin-content">
      <AdminUserManager />
    </div>
  </div>
);

export default AdminUserPage;
