import React from "react";
import "../index.css";

const Header = ({ onCartClick, onLoginClick, cartCount }) => {
  const userName = localStorage.getItem("userName");

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

        {/* User Profile */}
        {userName ? (
          <div className="user-chip">Hi, {userName.split(" ")[0]}</div>
        ) : (
          <button className="icon-btn" title="Login" onClick={onLoginClick}>
            👤
          </button>
        )}

        {/* Cart Icon with Badge */}
        <div className="cart-wrapper">
          <button className="icon-btn" title="Cart" onClick={onCartClick}>
            🛒
          </button>

          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
