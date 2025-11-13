import React from "react";
import "./OrderSuccess.css";

const OrderSuccess = ({ onClose }) => {
  return (
    <div className="success-overlay">
      <div className="success-box">

        <div className="checkmark">
          <div className="checkmark-circle"></div>
          <div className="checkmark-stem"></div>
          <div className="checkmark-kick"></div>
        </div>

        <h2>Order Placed Successfully!</h2>
        <p>Your delicious food is being prepared 🌮🍕</p>

        <button className="success-btn" onClick={onClose}>
          Continue Ordering
        </button>

      </div>
    </div>
  );
};

export default OrderSuccess;
