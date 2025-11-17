import React from "react";
import "./OrderSuccess.css";

const OrderSuccess = ({ onClose }) => {
  return (
    <div className="success-overlay">
      <div className="success-box">

        {/* SVG Checkmark */}
        <div className="success-icon">
          <svg width="85" height="85" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#4CAF50" />
            <path
              d="M7 12.5l3 3 6-6"
              stroke="white"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2>Order Placed Successfully!</h2>

        <p className="success-subtitle">
          Your delicious food is being prepared 🌮🍕
        </p>

        <button className="success-btn" onClick={onClose}>
          Continue Ordering
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
