import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import "../css/AdminUserManager.css";

const AdminUserManager = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "Admin" },
    { id: 2, name: "Trần Thị B", email: "b@example.com", role: "User" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addUser = () => {
    if (!newUser.name || !newUser.email) return alert("Vui lòng nhập đầy đủ thông tin!");
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ name: "", email: "", role: "User" });
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setNewUser(users[index]);
  };

  const updateUser = () => {
    const updatedUsers = [...users];
    updatedUsers[editingIndex] = { ...newUser };
    setUsers(updatedUsers);
    setEditingIndex(null);
    setNewUser({ name: "", email: "", role: "User" });
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="user-manager-container" style={{ flexGrow: 1, padding: "20px" }}>
        <h1>Quản lý người dùng</h1>

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
          <select name="role" value={newUser.role} onChange={handleChange}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          {editingIndex !== null ? (
            <button className="save-btn" onClick={updateUser}>💾 Cập nhật</button>
          ) : (
            <button className="add-btn" onClick={addUser}>➕ Thêm</button>
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
            {users.map((u, index) => (
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
      </div>
    </div>
  );
};

export default AdminUserManager;
