import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./css/AdminPricingEditor.css";

const API_BASE = "https://server-hxhc.onrender.com/api";

const AdminPricing = () => {
  const [pricingData, setPricingData] = useState({ plans: [], features: [] });
  const [loading, setLoading] = useState(true);
  const [savingIndex, setSavingIndex] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${API_BASE}/plans`);
        const plansArray = Array.isArray(res.data)
          ? res.data
          : res.data.plans || [];

        setPricingData((prev) => ({
          ...prev,
          plans: plansArray,
        }));
      } catch (error) {
        console.error("Lỗi khi tải danh sách gói:", error);
        alert("Không thể tải dữ liệu gói!");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanFieldChange = (index, field, value) => {
    const updatedPlans = [...pricingData.plans];
    updatedPlans[index][field] = value;
    setPricingData({ ...pricingData, plans: updatedPlans });
  };

  const updatePlan = async (index) => {
    const plan = pricingData.plans[index];
    setSavingIndex(index);
    try {
      await axios.put(`${API_BASE}/plans/${plan.id}`, plan, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Cập nhật thành công!");
    } catch (error) {
      alert("Lỗi khi cập nhật gói!");
    } finally {
      setSavingIndex(null);
    }
  };

  const addPlan = async () => {
    const newPlan = {
      name: "Gói mới",
      price: "",
      vnd: "",
      credits: "",
      posts: "",
      keywordTools: "",
      seoTools: "",
      payUrl: "",
    };

    try {
      const res = await axios.post(`${API_BASE}/plans`, newPlan, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPricingData((prev) => ({
        ...prev,
        plans: [...prev.plans, res.data.plan],
      }));
    } catch (err) {
      alert("Lỗi khi thêm gói mới!");
    }
  };

  const deletePlan = async (index) => {
    const planId = pricingData.plans[index].id;

    try {
      await axios.delete(`${API_BASE}/plans/${planId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedPlans = [...pricingData.plans];
      updatedPlans.splice(index, 1);
      setPricingData({ ...pricingData, plans: updatedPlans });
    } catch (error) {
      alert("Lỗi khi xoá gói!");
    }
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...pricingData.features];
    updatedFeatures[index] = value;
    setPricingData({ ...pricingData, features: updatedFeatures });
  };

  const addFeature = () => {
    setPricingData({
      ...pricingData,
      features: [...pricingData.features, "Tính năng mới"],
    });
  };

  const deleteFeature = (index) => {
    const updatedFeatures = [...pricingData.features];
    updatedFeatures.splice(index, 1);
    setPricingData({ ...pricingData, features: updatedFeatures });
  };

  const handleSave = () => {
    alert("Dữ liệu được cập nhật bằng nút Cập nhật của từng gói.");
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-area">
        <div className="admin-container">
          <h1>Chỉnh sửa Bảng Giá</h1>

          <h2 className="section-title">Danh sách Gói</h2>

          {pricingData.plans.length === 0 ? (
            <p style={{ color: "#888", fontStyle: "italic" }}>
              Không có gói nào.
            </p>
          ) : (
            <div className="plans-grid">
              {pricingData.plans.map((plan, index) => (
                <div className="plan-card" key={index}>
                  <div className="plan-header">
                    <h3>{plan.name}</h3>
                    <button
                      className="delete-btn"
                      onClick={() => deletePlan(index)}
                    >
                      ❌
                    </button>
                  </div>
                  <div className="form-grid">
                    <label>
                      Tên gói
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) =>
                          handlePlanFieldChange(index, "name", e.target.value)
                        }
                      />
                    </label>
                    <label>
                      Giá USD
                      <input
                        type="text"
                        value={plan.price}
                        onChange={(e) =>
                          handlePlanFieldChange(index, "price", e.target.value)
                        }
                      />
                    </label>
                    <label>
                      Giá VND
                      <input
                        type="text"
                        value={plan.vnd}
                        onChange={(e) =>
                          handlePlanFieldChange(index, "vnd", e.target.value)
                        }
                      />
                    </label>
                    <label>
                      Credits/tháng
                      <input
                        type="text"
                        value={plan.credits}
                        onChange={(e) =>
                          handlePlanFieldChange(index, "credits", e.target.value)
                        }
                      />
                    </label>
                    <label>
                      Bài viết/tháng
                      <input
                        type="text"
                        value={plan.posts}
                        onChange={(e) =>
                          handlePlanFieldChange(index, "posts", e.target.value)
                        }
                      />
                    </label>
                    <label>
                      Keyword Tools
                      <input
                        type="text"
                        value={plan.keywordTools}
                        onChange={(e) =>
                          handlePlanFieldChange(index, "keywordTools", e.target.value)
                        }
                      />
                    </label>
                    <label>
                      SEO Tools
                      <input
                        type="text"
                        value={plan.seoTools}
                        onChange={(e) =>
                          handlePlanFieldChange(index, "seoTools", e.target.value)
                        }
                      />
                    </label>
                    <label>
                      Link thanh toán
                      <input
                        type="text"
                        value={plan.payUrl || ""}
                        onChange={(e) =>
                          handlePlanFieldChange(index, "payUrl", e.target.value)
                        }
                      />
                    </label>
                  </div>
                  <button
                    className="save-button"
                    onClick={() => updatePlan(index)}
                    disabled={savingIndex === index}
                  >
                    {savingIndex === index ? "💾 Đang lưu..." : "💾 Cập nhật"}
                  </button>
                </div>
              ))}
            </div>
          )}

          <button className="add-button" onClick={addPlan}>
            + Thêm Gói
          </button>

          <h2 className="section-title">Tính Năng Chung</h2>

          {pricingData.features.length === 0 ? (
            <p style={{ color: "#888", fontStyle: "italic" }}>
              Không có tính năng nào.
            </p>
          ) : (
            <div className="features-list">
              {pricingData.features.map((feature, index) => (
                <div className="feature-row" key={index}>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                  />
                  <button
                    className="delete-btn"
                    onClick={() => deleteFeature(index)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          )}

          <button className="add-button" onClick={addFeature}>
            + Thêm Tính Năng
          </button>
          <button className="save-button" onClick={handleSave}>
            💾 Lưu Thay Đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPricing;
