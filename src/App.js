import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import AdminUserManager from './components/AdminUserManager';
import PaymentManager from './screens/PaymentManager';
import Login from "./screens/Login";
import Register from "./screens/Register";
import AdminPricing from './screens/AdminPricing';
import ManagePosts from './screens/ManagePosts'; // ⬅️ THÊM DÒNG NÀY

function App() {
  return (
    <div className="app-container" style={{ display: 'flex' }}>
      <main style={{ flexGrow: 1, padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<AdminUserManager />} />
          <Route path="/payments" element={<PaymentManager />} />
          <Route path="/pricing" element={<AdminPricing />} />
          <Route path="/posts" element={<ManagePosts />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;
