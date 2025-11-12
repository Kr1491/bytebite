import React, { useState } from "react";

const AuthModal = ({ onClose }) => {
  const [tab, setTab] = useState("login");

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Welcome to Byte Bite</h2>
        <p>Login or create an account to continue ordering</p>

        <div className="tab-container">
          <button className={tab === "login" ? "active" : ""} onClick={() => setTab("login")}>Login</button>
          <button className={tab === "signup" ? "active" : ""} onClick={() => setTab("signup")}>Sign Up</button>
        </div>

        <input type="email" placeholder="your.email@example.com" />
        <input type="password" placeholder="Password" />
        <button className="primary-btn">{tab === "login" ? "Login" : "Sign Up"}</button>
        <p className="demo-text">Demo: Just enter any email to continue</p>
      </div>
    </div>
  );
};

export default AuthModal;
