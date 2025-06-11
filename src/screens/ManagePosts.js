import React from 'react';
import '../css/ManagePosts.css';
import Sidebar from '../components/Sidebar';

const ManagePosts = () => {
  const posts = [
    {
      id: 1,
      title: 'Hướng dẫn kiếm tiền online hiệu quả 2025',
      author: 'Nguyễn Văn A',
      date: '2025-06-10',
      status: 'Đã duyệt',
    },
    {
      id: 2,
      title: '5 cách tăng tương tác trên mạng xã hội',
      author: 'Trần Thị B',
      date: '2025-06-08',
      status: 'Chờ duyệt',
    },
    {
      id: 3,
      title: 'Chiến lược content marketing mới nhất',
      author: 'Lê Văn C',
      date: '2025-06-05',
      status: 'Bị từ chối',
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Quản lý Bài viết</h1>
          <p>Danh sách và trạng thái các bài viết trong hệ thống</p>
          <button className="add-post-btn">+ Tạo bài viết mới</button>
        </header>

        <section className="posts-table-section">
          <table className="posts-table">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Tác giả</th>
                <th>Ngày đăng</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{post.date}</td>
                  <td>
                    <span className={`status ${post.status.replace(/\s/g, '-').toLowerCase()}`}>
                      {post.status}
                    </span>
                  </td>
                  <td>
                    <button className="edit-btn">Sửa</button>
                    <button className="delete-btn">Xoá</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default ManagePosts;
