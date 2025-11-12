import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";

const MenuModal = ({ restaurant, onAddToCart, onClose }) => {
  const [menu, setMenu] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/restaurants/${restaurant._id}/menu`)
      .then((res) => setMenu(res.data))
      .catch((err) => console.error("Error loading menu:", err));
  }, [restaurant]);

  // Increase quantity
  const handleAdd = (item) => {
    setQuantities((prev) => ({
      ...prev,
      [item._id]: (prev[item._id] || 0) + 1,
    }));
    onAddToCart(item);
  };

  // Decrease quantity
  const handleRemove = (item) => {
    setQuantities((prev) => {
      const newQty = (prev[item._id] || 0) - 1;
      if (newQty <= 0) {
        const { [item._id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [item._id]: newQty };
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{restaurant.name} Menu</h2>

        <ul className="menu-list">
          {menu.map((item) => (
            <li key={item._id}>
              <div className="menu-item-info">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
              <div className="menu-item-action">
                {quantities[item._id] ? (
                  <div className="qty-control">
                    <button onClick={() => handleRemove(item)}>-</button>
                    <span>{quantities[item._id]}</span>
                    <button onClick={() => handleAdd(item)}>+</button>
                  </div>
                ) : (
                  <button
                    className="add-btn"
                    onClick={() => handleAdd(item)}
                  >
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
