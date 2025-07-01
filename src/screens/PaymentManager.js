import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../css/PaymentManager.css";

const API_BASE = "https://server-hxhc.onrender.com/api";

const PaymentManager = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/orders/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedOrders = res.data.orders.map((order) => ({
        id: order.id,
        transactionId: `ORD${String(order.id).padStart(3, "0")}`,
        userId: order.user_id || "Không rõ",
        amount: order.total,
        method: "Qua QR", // Mặc định vì API không trả
        date: new Date(order.created_at).toLocaleDateString("vi-VN"),
        status: mapStatus(order.status),
        rawStatus: order.status, // giữ để xử lý logic
      }));

      setPayments(fetchedOrders);
    } catch (error) {
      console.error("Lỗi khi tải danh sách thanh toán:", error);
      alert("Không thể tải danh sách đơn hàng!");
    } finally {
      setLoading(false);
    }
  };

  const mapStatus = (status) => {
    switch (status) {
      case "pending":
        return "Đang xử lý";
      case "paid":
        return "Hoàn thành";
      case "cancelled":
        return "Đã huỷ";
      case "completed":
        return "Đã hoàn tất";
      default:
        return "Không xác định";
    }
  };

  const markAsPaid = async (orderId) => {
    const confirm = window.confirm("Bạn có chắc muốn duyệt thanh toán đơn hàng này?");
    if (!confirm) return;

    try {
      await axios.post(
        `${API_BASE}/orders/admin-confirm-payment/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Đã duyệt thanh toán thành công!");
      fetchPayments();
    } catch (error) {
      console.error("Lỗi khi duyệt thanh toán:", error);
      alert(
        error.response?.data?.message || "Không thể duyệt thanh toán!"
      );
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-area">
        <div className="payment-container">
          <h1>Quản lý thanh toán</h1>

          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Mã giao dịch</th>
                  <th>ID người dùng</th>
                  <th>Số tiền</th>
                  <th>Phương thức</th>
                  <th>Ngày</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.transactionId}</td>
                    <td>{payment.userId}</td>
                    <td>{payment.amount?.toLocaleString()}₫</td>
                    <td>{payment.method}</td>
                    <td>{payment.date}</td>
                    <td>
                      {payment.rawStatus === "pending" ? (
                        <button
                          onClick={() => markAsPaid(payment.id)}
                          className="mark-paid-btn"
                        >
                          ✅ Duyệt thanh toán
                        </button>
                      ) : (
                        <span
                          className={`status ${payment.status
                            .toLowerCase()
                            .replace(/\s/g, "-")}`}
                        >
                          {payment.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentManager;
