import React from "react";
import "../index.css";

const CheckoutModal = ({ total, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal checkout-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Order Summary</h2>
        <p className="checkout-desc">
          Review your order details before making payment
        </p>

        <div className="checkout-summary">
          <div className="checkout-row">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="checkout-row">
            <span>Delivery Fee</span>
            <span>₹20</span>
          </div>
          <div className="checkout-row total">
            <span>Total Payable</span>
            <span>₹{total + 20}</span>
          </div>
        </div>

        <div className="checkout-footer">
          <button className="pay-btn">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
