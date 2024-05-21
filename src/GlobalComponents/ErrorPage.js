import React from "react";
import "./ErrorPage.css";

const ErrorPage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <div className="error-message">{message}</div>
    </div>
  );
};

export default ErrorPage;
