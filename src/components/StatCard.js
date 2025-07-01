import React from 'react';
import '../css/Dashboard.css';

const StatCard = ({ title, value, note }) => (
  <div className="stat-card">
    <p>{title}</p>
    <h2>{value}</h2>
    <span className="positive">{note}</span>
  </div>
);

export default StatCard;
