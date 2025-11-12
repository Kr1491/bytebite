import React from "react";
import "../index.css";

const CartDrawer = ({ cart, onClose }) => {
  // group items and count quantity
  const grouped = cart.reduce((acc, item) => {
    const key = item._id;
    if (!acc[key]) acc[key] = { ...item, qty: 0 };
    acc[key].qty += 1;
    return acc;
  }, {});
  const items = Object.values(grouped);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="drawer-overlay">
      <div className="drawer">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

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
              <div key={item._id} className="cart-item">
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
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
