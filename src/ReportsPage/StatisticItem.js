import React from 'react';
import './StatisticItem.css';

const StatisticItem = ({ label, value, theme }) => (
  <div className={`statistic-item ${theme}`}>
    <div className="statistic-label">{label}</div>
    <div className="statistic-value">{value}</div>
  </div>
);

export default StatisticItem;
