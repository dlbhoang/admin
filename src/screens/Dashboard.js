import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import RecentActivities from '../components/RecentActivities';
import QuickStats from '../components/QuickStats';
import axios from 'axios';

const API_BASE = "https://server-hxhc.onrender.com/api";

const Dashboard = () => {
  const [orderStats, setOrderStats] = useState(null);
  const [planStats, setPlanStats] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [orderRes, planRes] = await Promise.all([
        axios.get(`${API_BASE}/orders/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_BASE}/plans/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setOrderStats(orderRes.data);
      setPlanStats(planRes.data);
    } catch (err) {
      console.error("Lỗi khi lấy thống kê:", err);
      alert("Không thể tải thống kê!");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Tổng quan về hoạt động của hệ thống</p>
        </header>

        <section className="stats-overview">
          {orderStats && planStats ? (
            <>
              {/* Thống kê đơn hàng */}
              <StatCard
                title="Tổng đơn hàng"
                value={orderStats.total_orders}
                note="Bao gồm cả đã thanh toán và đang chờ"
              />
              <StatCard
                title="Tổng doanh thu"
                value={Number(orderStats.total_revenue).toLocaleString()}
                note="Đơn vị: VND"
              />
              <StatCard
                title="Đơn đang xử lý"
                value={orderStats.pending_orders}
                note="Đơn chưa xác nhận"
              />
              <StatCard
                title="Đơn đã thanh toán"
                value={orderStats.paid_orders}
                note="Hoàn tất thanh toán"
              />

              {/* Thống kê gói */}
              <StatCard
                title="Tổng số gói"
                value={planStats.total_plans}
                note="Số lượng gói hiện có"
              />
              <StatCard
                title="Tổng credits của tất cả gói"
                value={planStats.total_credits}
                note="Tổng credits hiện có"
              />
              <StatCard
                title="Gói cao nhất"
                value={planStats.most_expensive_plan?.name || "Không có"}
                note={`${Number(planStats.most_expensive_plan?.price_vnd || 0).toLocaleString()} VND`}
              />
            </>
          ) : (
            <p>Đang tải thống kê...</p>
          )}
        </section>

        <section className="dashboard-bottom">
       
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
