import React from "react";
import "./FakeRazorpay.css";

const FakeRazorpay = ({ amount, onSuccess, onCancel }) => {
  return (
    <div className="rzp-overlay">
      <div className="rzp-box">

        <h2 className="rzp-title">Razorpay</h2>
        <p className="rzp-tagline">Trusted Payment Gateway</p>

        <div className="rzp-amount-box">
          <span>Amount to Pay</span>
          <h3>₹{amount}</h3>
        </div>

        <button className="rzp-pay-btn" onClick={onSuccess}>
          Pay Securely
        </button>

        <button className="rzp-cancel-btn" onClick={onCancel}>
          Cancel Payment
        </button>
      </div>
    </div>
  );
};

export default FakeRazorpay;
