import React, { useState } from "react";
import "./Header.css";

const Header = ({ onCartClick, onLoginClick, cartCount }) => {
  const userName = localStorage.getItem("userName");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setMenuOpen(false);
    window.location.reload(); // Refresh UI
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Byte Bite" className="logo-img" />
        <div className="logo-text">
          <h1>Byte Bite</h1>
          <p>Your Digital Canteen</p>
        </div>
      </div>

      <div className="header-right">

        {/* ======= USER NAME / LOGIN BUTTON ======= */}
        {userName ? (
          <div className="user-menu-container" style={{ position: "relative" }}>
            <div
              className="user-name"
              style={{ cursor: "pointer" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Hi, {userName.split(" ")[0]}
            </div>

            {menuOpen && (
              <div
                className="logout-dropdown"
                style={{
                  position: "absolute",
                  top: "38px",
                  right: "0",
                  background: "white",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                  zIndex: 9999,
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#d32f2f",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="icon-btn" title="Login" onClick={onLoginClick}>
            👤
          </button>
        )}

        {/* ======= CART ICON ======= */}
        <div className="cart-wrapper" onClick={onCartClick}>
          <span className="cart-icon">🛒</span>

          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>

      </div>
    </header>
  );
};

export default Header;
