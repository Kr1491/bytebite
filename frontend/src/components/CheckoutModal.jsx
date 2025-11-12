import React from "react";
import axios from "axios";
import "../index.css";

const CheckoutModal = ({ total, onClose, cart, userEmail }) => {
  const handlePayment = async () => {
    try {
      const orderData = {
        userEmail,
        items: cart,
        total,
      };
      await axios.post("http://localhost:5000/api/orders", orderData);
      alert("✅ Payment successful! Order placed.");
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Error placing order.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal checkout-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Order Summary</h2>
        <p className="checkout-desc">Review your order details before making payment</p>

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
          <button className="pay-btn" onClick={handlePayment}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
