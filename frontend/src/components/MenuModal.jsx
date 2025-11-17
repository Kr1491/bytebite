import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
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

  // ❗ Quantities derived from GLOBAL CART — no reset issues
  const quantities = cart.reduce((acc, item) => {
    if (item._id) {
      acc[item._id] = (acc[item._id] || 0) + 1;
    }
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
              <div className="menu-item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">₹{item.price}</span>
              </div>

              <div className="menu-item-action">
                {quantities[item._id] ? (
                  <div className="qty-control">

                    {/* Remove Button */}
                    <button onClick={() => onRemoveFromCart(item)}>-</button>

                    {/* Quantity */}
                    <span>{quantities[item._id]}</span>

                    {/* Add Button */}
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
