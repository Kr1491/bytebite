import React, { useState } from "react";
import axios from "axios";
import "../index.css";
import FakeRazorpay from "./FakeRazorpay";
import OrderSuccess from "./OrderSuccess";

const CheckoutModal = ({ total, cart, onClose, clearCart }) => {

  const [showRazorpay, setShowRazorpay] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayment = async () => {
    try {
      console.log("CheckoutModal received cart:", cart);

      if (!cart || cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        alert("Please login first");
        return;
      }

      const items = cart.map(item => ({
        name: item.name,
        price: item.price,
        qty: item.qty ?? 1
      }));

      const payload = {
        userEmail,
        items,
        total,
        deliveryFee: 20
      };

      console.log("Sending Payload:", payload);

      await axios.post("http://localhost:5001/api/orders", payload);

      // ❌ REMOVE OLD ALERT
      // alert("Order placed successfully!");

      clearCart();
      setShowRazorpay(false);   // close razorpay
      setShowSuccess(true);     // show success animation

    } catch (error) {
      console.error("Order Error:", error.response?.data || error);
      alert("Error placing order");
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
          <button className="pay-btn" onClick={() => setShowRazorpay(true)}>
            Pay Now
          </button>
        </div>

        {/* Razorpay Popup */}
        {showRazorpay && (
          <FakeRazorpay
            amount={total + 20}
            onSuccess={handlePayment}
            onCancel={() => setShowRazorpay(false)}
          />
        )}

        {/* Success Popup */}
        {showSuccess && (
          <OrderSuccess
            onClose={() => {
              setShowSuccess(false);
              onClose(); // close checkout modal
            }}
          />
        )}

      </div>
    </div>
  );
};

export default CheckoutModal;
