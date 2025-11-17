import React from "react";
import "./Header.css";

const Header = ({ onCartClick, onLoginClick, cartCount }) => {
  const userName = localStorage.getItem("userName");

  return (
    <header className="header">
      
      {/* ========== LEFT LOGO ========== */}
      <div className="logo">
        <img src="/logo.png" alt="Byte Bite" className="logo-img" />
        <div className="logo-text">
          <h1>Byte Bite</h1>
          <p>Your Digital Canteen</p>
        </div>
      </div>

      {/* ========== RIGHT SECTION ========== */}
      <div className="header-right">

        {/* Username / Login Button */}
        {userName ? (
          <div className="user-name">Hi, {userName.split(" ")[0]}</div>
        ) : (
          <button className="icon-btn" title="Login" onClick={onLoginClick}>
            👤
          </button>
        )}

        {/* Cart Icon + Badge */}
        <div className="cart-wrapper" onClick={onCartClick}>
          <span className="cart-icon">🛒</span>

          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
