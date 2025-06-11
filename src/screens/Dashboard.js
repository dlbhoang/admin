import React from 'react';
import '../css/Dashboard.css';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import RecentActivities from '../components/RecentActivities';
import QuickStats from '../components/QuickStats';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Tổng quan về hoạt động của hệ thống</p>
        </header>

        <section className="stats-overview">
          <StatCard title="Tổng người dùng" value="1,234" note="+12% so với tháng trước" />
          <StatCard title="Dự án đang xử lý" value="89" note="+5 dự án mới hôm nay" />
          <StatCard title="Doanh thu tháng này" value="45,231,000 VND" note="+8% so với tháng trước" />
          <StatCard title="Tỉ lệ index trung bình" value="87.5%" note="+2.1% so với tuần trước" />
        </section>

        <section className="dashboard-bottom">
          <RecentActivities />
          <QuickStats />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
