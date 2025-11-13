import React, { useState, useEffect } from "react";
import "../index.css";

const Header = ({ onCartClick, onLoginClick }) => {
  const [userName, setUserName] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUserName(null);
    setOpenMenu(false);
    window.location.reload();
  };

  return (
    <header className="header">
      {/* LOGO */}
      <div className="logo">
        <img src="/logo.png" alt="Byte Bite" className="logo-img" />
        <div>
          <h1>Byte Bite</h1>
          <p>Your Digital Canteen</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="header-right">

        {/* USER SECTION */}
        {userName ? (
          <div className="user-section">
            <span
              className="user-name"
              onClick={() => setOpenMenu(!openMenu)}
            >
              Hi, {userName} ▾
            </span>

            {openMenu && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="icon-btn" title="Login" onClick={onLoginClick}>
            👤 Login
          </button>
        )}

        {/* CART ICON */}
        <button className="icon-btn" title="Cart" onClick={onCartClick}>
          🛒
        </button>
      </div>
    </header>
  );
};

export default Header;
