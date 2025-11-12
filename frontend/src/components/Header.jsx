import React from "react";
import "../index.css";

const Header = ({ onCartClick, onLoginClick }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Byte Bite" className="logo-img" />
        <div>
          <h1>Byte Bite</h1>
          <p>Your Digital Canteen</p>
        </div>
      </div>
      <div className="header-icons">
        <button className="icon-btn" title="Login" onClick={onLoginClick}>👤</button>
        <button className="icon-btn" title="Cart" onClick={onCartClick}>🛒</button>
      </div>
    </header>
  );
};

export default Header;
