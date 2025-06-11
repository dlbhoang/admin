// src/pages/PaymentManager.js
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../css/PaymentManager.css";

const dummyPayments = [
  {
    id: "PMT001",
    user: "Nguyễn Văn A",
    amount: 120000,
    method: "Chuyển khoản",
    date: "2024-08-01",
    status: "Hoàn thành",
  },
  {
    id: "PMT002",
    user: "Trần Thị B",
    amount: 85000,
    method: "Momo",
    date: "2024-08-03",
    status: "Đang xử lý",
  },
  {
    id: "PMT003",
    user: "Lê Văn C",
    amount: 65000,
    method: "Tiền mặt",
    date: "2024-08-05",
    status: "Thất bại",
  },
];

const PaymentManager = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Giả lập gọi API
    setPayments(dummyPayments);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-area">
        <div className="payment-container">
          <h1>Quản lý thanh toán</h1>
          <table className="payment-table">
            <thead>
              <tr>
                <th>Mã giao dịch</th>
                <th>Người dùng</th>
                <th>Số tiền</th>
                <th>Phương thức</th>
                <th>Ngày</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.user}</td>
                  <td>{payment.amount.toLocaleString()}₫</td>
                  <td>{payment.method}</td>
                  <td>{payment.date}</td>
                  <td>
                    <span className={`status ${payment.status.toLowerCase().replace(/\s/g, "-")}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentManager;
