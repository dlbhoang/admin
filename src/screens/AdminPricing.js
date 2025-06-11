import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./css/AdminPricingEditor.css";

const initialData = {
  plans: [
    {
      name: "Free",
      price: "$0/tháng",
      vnd: "(0,0 vnd)",
      credits: "5,000",
      posts: "0",
      keywordTools: "✔️",
      seoTools: "",
    },
    {
      name: "Starter",
      price: "$9/tháng",
      vnd: "(225,000 vnd)",
      credits: "180,000",
      posts: "60",
      keywordTools: "Unlimited",
      seoTools: "✔️",
    },
  ],
  features: [
    "Hỗ trợ 100+ ngôn ngữ",
    "Viết bài bằng AI",
  ],
};

const AdminPricing = () => {
  const [pricingData, setPricingData] = useState(initialData);

  const handlePlanChange = (index, field, value) => {
    const updatedPlans = [...pricingData.plans];
    updatedPlans[index][field] = value;
    setPricingData({ ...pricingData, plans: updatedPlans });
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...pricingData.features];
    updatedFeatures[index] = value;
    setPricingData({ ...pricingData, features: updatedFeatures });
  };

  const addPlan = () => {
    const newPlan = {
      name: "Gói mới",
      price: "",
      vnd: "",
      credits: "",
      posts: "",
      keywordTools: "",
      seoTools: "",
    };
    setPricingData({ ...pricingData, plans: [...pricingData.plans, newPlan] });
  };

  const deletePlan = (index) => {
    const updatedPlans = [...pricingData.plans];
    updatedPlans.splice(index, 1);
    setPricingData({ ...pricingData, plans: updatedPlans });
  };

  const addFeature = () => {
    setPricingData({ ...pricingData, features: [...pricingData.features, "Tính năng mới"] });
  };

  const deleteFeature = (index) => {
    const updatedFeatures = [...pricingData.features];
    updatedFeatures.splice(index, 1);
    setPricingData({ ...pricingData, features: updatedFeatures });
  };

  const handleSave = () => {
    console.log("Dữ liệu đã lưu:", pricingData);
    alert("Đã lưu thay đổi thành công!");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-area">
        <div className="admin-container">
          <h1>Chỉnh sửa Bảng Giá</h1>
          <h2>Các Gói</h2>
          {pricingData.plans.map((plan, index) => (
            <div className="plan-box" key={index}>
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <button className="delete-btn" onClick={() => deletePlan(index)}>Xóa</button>
              </div>
              <input
                type="text"
                value={plan.name}
                onChange={(e) => handlePlanChange(index, "name", e.target.value)}
                placeholder="Tên gói"
              />
              <input
                type="text"
                value={plan.price}
                onChange={(e) => handlePlanChange(index, "price", e.target.value)}
                placeholder="Giá USD"
              />
              <input
                type="text"
                value={plan.vnd}
                onChange={(e) => handlePlanChange(index, "vnd", e.target.value)}
                placeholder="Giá VND"
              />
              <input
                type="text"
                value={plan.credits}
                onChange={(e) => handlePlanChange(index, "credits", e.target.value)}
                placeholder="Credits/tháng"
              />
              <input
                type="text"
                value={plan.posts}
                onChange={(e) => handlePlanChange(index, "posts", e.target.value)}
                placeholder="Bài viết/tháng"
              />
              <input
                type="text"
                value={plan.keywordTools}
                onChange={(e) => handlePlanChange(index, "keywordTools", e.target.value)}
                placeholder="Keyword Tools"
              />
              <input
                type="text"
                value={plan.seoTools}
                onChange={(e) => handlePlanChange(index, "seoTools", e.target.value)}
                placeholder="SEO Tools"
              />
            </div>
          ))}
          <button className="add-button" onClick={addPlan}>+ Thêm Gói</button>

          <h2>Tính Năng Chung</h2>
          {pricingData.features.map((feature, index) => (
            <div key={index} className="feature-row">
              <input
                className="feature-input"
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="Tính năng"
              />
              <button className="delete-btn" onClick={() => deleteFeature(index)}>X</button>
            </div>
          ))}
          <button className="add-button" onClick={addFeature}>+ Thêm Tính Năng</button>

          <button className="save-button" onClick={handleSave}>💾 Lưu Thay Đổi</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPricing;
