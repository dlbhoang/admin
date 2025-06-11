import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra thông tin đăng nhập ở đây (có thể gọi API thực)
    if (form.email === "admin@example.com" && form.password === "123456") {
      localStorage.setItem("token", "fake-jwt-token");
      navigate("/dashboard");
    } else {
      alert("Email hoặc mật khẩu không đúng!");
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
