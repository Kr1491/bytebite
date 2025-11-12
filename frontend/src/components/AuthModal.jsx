import React, { useState } from "react";
import axios from "axios";
import "../index.css";

const AuthModal = ({ onClose, setUserEmail }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "signup";
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, payload);
      alert(isLogin ? "✅ Login successful" : "✅ Signup successful");
      setUserEmail(email);
      onClose();
    } catch (err) {
      alert("❌ Authentication failed. Try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal auth-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Welcome to Byte Bite</h2>
        <p>Login or create an account to continue ordering</p>

        <div className="auth-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;  // ✅ Make sure this line exists
