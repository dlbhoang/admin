import React from 'react';
import '../css/Dashboard.css';

const RecentActivities = () => (
  <div className="recent-activities">
    <h3>Hoạt động gần đây</h3>
    <ul>
      <li>Người dùng mới đăng ký: john.doe@example.com <span>2 phút trước</span></li>
      <li>Dự án mới được tạo: SEO Website ABC <span>15 phút trước</span></li>
      <li>Nạp tiền: 500,000 VND từ user123 <span>1 giờ trước</span></li>
      <li>Dự án hoàn thành: Marketing Campaign XYZ <span>2 giờ trước</span></li>
      <li>Giao dịch xác nhận: 1,000,000 VND <span>3 giờ trước</span></li>
    </ul>
  </div>
);

export default RecentActivities;
