import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../css/AdminUserManager.css";

const API_BASE = "https://server-hxhc.onrender.com/api";

const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "user" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Không thể tải danh sách người dùng!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Lọc danh sách dựa theo newUser.role nếu khác "all"
  const filteredUsers =
    newUser.role === "all" ? users : users.filter((u) => u.role === newUser.role);

  const startEdit = (indexInFiltered) => {
    const userToEdit = filteredUsers[indexInFiltered];
    const originalIndex = users.findIndex((u) => u.id === userToEdit.id);
    setEditingIndex(originalIndex);
    setNewUser({ ...userToEdit, password: "" });
  };

  const updateUser = async () => {
    if (newUser.role === "all") {
      alert("Vui lòng chọn vai trò hợp lệ!");
      return;
    }

    const userId = users[editingIndex].id;
    const updatedData = { ...newUser };
    if (!updatedData.password) delete updatedData.password;

    try {
      await axios.put(`${API_BASE}/auth/users/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      setEditingIndex(null);
      setNewUser({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      alert("Lỗi khi cập nhật người dùng!");
    }
  };

  const createUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Vui lòng nhập đầy đủ họ tên, email và mật khẩu!");
      return;
    }

    if (newUser.role === "all") {
      alert("Vui lòng chọn vai trò hợp lệ!");
      return;
    }

    try {
      await axios.post(`${API_BASE}/auth/users`, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      setNewUser({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      alert("Lỗi khi tạo người dùng mới!");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá người dùng này?")) return;
    try {
      await axios.delete(`${API_BASE}/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert("Lỗi khi xoá người dùng!");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="user-manager-container" style={{ flexGrow: 1, padding: "20px" }}>
        <h1>Quản lý người dùng</h1>

        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={newUser.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={newUser.password}
                onChange={handleChange}
              />
              <select
                name="role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="all">-- Tất cả / Chưa chọn vai trò --</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {editingIndex !== null ? (
                <button className="save-btn" onClick={updateUser}>💾 Cập nhật</button>
              ) : (
                <button className="add-btn" onClick={createUser}>➕ Tạo mới</button>
              )}
            </div>

            <table className="user-table">
              <thead>
                <tr>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, index) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <button className="edit-btn" onClick={() => startEdit(index)}>✏️</button>
                      <button className="delete-btn" onClick={() => deleteUser(u.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUserManager;
