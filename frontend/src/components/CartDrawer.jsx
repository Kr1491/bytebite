import React, { useState } from "react";
import CheckoutModal from "./CheckoutModal";
import "../index.css";

const CartDrawer = ({ cart, clearCart, onClose }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  // Group cart items
  const grouped = cart.reduce((acc, item) => {
    const key = item._id || item.name;
    if (!acc[key]) acc[key] = { ...item, qty: 0 };
    acc[key].qty += 1;
    return acc;
  }, {});

  const items = Object.values(grouped);

  // Calculate total
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleCheckoutClick = () => {
    if (!localStorage.getItem("userEmail")) {
      alert("Please login first");
      return;
    }
    setShowCheckout(true);
  };

  return (
    <div className="drawer-overlay">
      <div className="drawer">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>Your Cart</h2>
        <p>Review your items and proceed to checkout</p>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>🛍️ Your cart is empty</p>
            <span>Add items from the menu to get started</span>
          </div>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <div key={item._id || item.name} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>
                    ₹{item.price} × {item.qty}
                  </p>
                </div>
                <span className="cart-item-total">
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))}

            <div className="cart-summary">
              <h3>Total: ₹{total}</h3>

              {/* Only ONE checkout button */}
              <button className="checkout-btn" onClick={handleCheckoutClick}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {showCheckout && (
        <CheckoutModal
          total={total}
          cart={cart}
          clearCart={clearCart}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
};

export default CartDrawer;
