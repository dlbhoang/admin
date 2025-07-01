import React from 'react';
import '../css/Dashboard.css';

const QuickStats = () => (
  <div className="quick-stats">
    <h3>Thống kê nhanh</h3>
    <ul>
      <li>Dự án hoàn thành hôm nay <span className="value">12</span></li>
      <li>Giao dịch chờ xác nhận <span className="warning">3</span></li>
      <li>Người dùng online <span className="value">45</span></li>
      <li>Tỉ lệ thành công index <span className="success">89.2%</span></li>
    </ul>
  </div>
);

export default QuickStats;
