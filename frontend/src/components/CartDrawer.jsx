import React, { useState } from "react";
import CheckoutModal from "./CheckoutModal";
import "../index.css";
import "./CartDrawer.css";


const CartDrawer = ({ cart, setCart, clearCart, onClose }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  // Group items by ID
  const grouped = cart.reduce((acc, item) => {
    const key = item._id;
    if (!acc[key]) acc[key] = { ...item, qty: 0 };
    acc[key].qty += 1;
    return acc;
  }, {});

  const items = Object.values(grouped);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  // Increase qty (add another copy)
  const increaseQty = (item) => {
    setCart((prev) => [...prev, item]); // add one more
  };

  // Decrease qty (remove one copy)
  const decreaseQty = (item) => {
    setCart((prev) => {
      const index = prev.findIndex((i) => i._id === item._id);
      if (index === -1) return prev;

      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
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
              <div key={item._id} className="cart-item">

                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>

                <div className="cart-controls">
                  <button onClick={() => decreaseQty(item)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item)}>+</button>
                </div>

                <span className="cart-item-total">
                  ₹{item.price * item.qty}
                </span>

              </div>
            ))}

            <div className="cart-summary">
              <h3>Total: ₹{total}</h3>
              <button
                className="checkout-btn"
                onClick={() => {
                  if (!localStorage.getItem("userEmail")) {
                    alert("Please login first");
                    return;
                  }
                  setShowCheckout(true);
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {showCheckout && (
        <CheckoutModal
          total={total}
          cart={items}
          clearCart={clearCart}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
};

export default CartDrawer;
