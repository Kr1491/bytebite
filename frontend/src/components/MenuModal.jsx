import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MenuModal.css";

const MenuModal = ({ restaurant, cart, onAddToCart, onRemoveFromCart, onClose }) => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (!restaurant?._id) return;

    axios
      .get(`http://localhost:5001/api/restaurants/${restaurant._id}/menu`)
      .then((res) => setMenu(res.data))
      .catch((err) => console.error("Error loading menu:", err));
  }, [restaurant]);

  // Quantities from CART
  const quantities = cart.reduce((acc, item) => {
    if (item._id) acc[item._id] = (acc[item._id] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="menu-overlay">
      <div className="menu-modal">

        {/* Close Button */}
        <button className="menu-close-btn" onClick={onClose}>✖</button>

        <h2 className="menu-title">{restaurant.name} Menu</h2>

        <ul className="menu-list">
          {menu.map((item) => (
            <li key={item._id} className="menu-item">

              {/* LEFT SIDE — Name + Price */}
              <div className="menu-item-left">
                <span className="menu-item-name">{item.name}</span>
                <span className="menu-item-price">₹{item.price}</span>
              </div>

              {/* RIGHT SIDE — Add / Quantity */}
              <div className="menu-item-action">
                {quantities[item._id] ? (
                  <div className="qty-control">
                    <button onClick={() => onRemoveFromCart(item)}>-</button>
                    <span>{quantities[item._id]}</span>
                    <button onClick={() => onAddToCart(item)}>+</button>
                  </div>
                ) : (
                  <button className="add-btn" onClick={() => onAddToCart(item)}>
                    Add
                  </button>
                )}
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuModal;
