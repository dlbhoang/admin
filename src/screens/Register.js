import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    // Xử lý đăng ký (gửi lên server hoặc lưu giả lập)
    alert("Đăng ký thành công!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={form.name}
          onChange={handleChange}
          required
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Đăng ký</button>
      </form>
      <p>
        Đã có tài khoản?{" "}
        <span className="link" onClick={() => navigate("/login")}>
          Đăng nhập
        </span>
      </p>
    </div>
  );
};

export default Register;
