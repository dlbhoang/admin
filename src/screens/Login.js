// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";
import axios from "axios";

// ✅ Đổi sang API đúng theo cURL bạn cung cấp
const API_BASE = "https://server-hxhc.onrender.com";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, form);

      const { token, user } = res.data;

      if (user.role !== "admin") {
        alert("Chỉ admin mới được phép truy cập!");
        return;
      }

      // ✅ Lưu thông tin và chuyển hướng
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Email hoặc mật khẩu không đúng hoặc lỗi máy chủ!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>
        Chưa có tài khoản?{" "}
        <span className="link" onClick={() => navigate("/register")}>
          Đăng ký
        </span>
      </p>
    </div>
  );
};

export default Login;
