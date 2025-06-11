import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaProjectDiagram,
  FaMoneyBillWave,
  FaCog,
  FaSignOutAlt,
  FaNewspaper // ⬅️ THÊM ICON CHO BÀI VIẾT
} from 'react-icons/fa';
import '../css/Dashboard.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard" className="sidebar-item" activeclassname="active">
            <FaTachometerAlt className="sidebar-icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className="sidebar-item" activeclassname="active">
            <FaUsers className="sidebar-icon" />
            <span>Người dùng</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/posts" className="sidebar-item" activeclassname="active">
            <FaNewspaper className="sidebar-icon" />
            <span>Bài viết</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/payments" className="sidebar-item" activeclassname="active">
            <FaProjectDiagram className="sidebar-icon" />
            <span>Hóa đơn</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/pricing" className="sidebar-item" activeclassname="active">
            <FaMoneyBillWave className="sidebar-icon" />
            <span>Thanh toán</span>
          </NavLink>
        </li>
        <li>
          <button className="sidebar-item logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="sidebar-icon" />
            <span>Đăng xuất</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
