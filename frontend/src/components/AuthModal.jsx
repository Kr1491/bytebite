import { useState } from "react";
import axios from "axios";
import "./AuthModal.css";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Validate signup passwords
      if (!isLogin && form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const url = isLogin
        ? "http://localhost:5001/api/auth/login"
        : "http://localhost:5001/api/auth/signup";

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const response = await axios.post(url, payload);

      alert(response.data.message);

      // 🟢 Save logged-in user's email for order placement
      if (isLogin) {
        localStorage.setItem("userEmail", form.email);
      }

      // Close modal after success
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Authentication failed");
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-box">

        <h2>{isLogin ? "Login" : "Create an Account"}</h2>

        {/* Signup Name Field */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            className="auth-input"
            placeholder="Full Name"
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          className="auth-input"
          placeholder="Email Address"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          className="auth-input"
          placeholder="Password"
          onChange={handleChange}
        />

        {/* Confirm Password Only for Signup */}
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            className="auth-input"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
        )}

        <button className="auth-button" onClick={handleSubmit}>
          {isLogin ? "Login" : "Signup"}
        </button>

        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "New user? Sign up" : "Already have an account? Login"}
        </p>

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

      </div>
    </div>
  );
};

export default AuthModal;
