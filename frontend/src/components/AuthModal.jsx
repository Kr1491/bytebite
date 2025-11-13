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
      if (!isLogin && form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const url = isLogin
        ? "http://localhost:5001/api/auth/login"
        : "http://localhost:5001/api/auth/signup";

      const payload = isLogin
        ? {
            email: form.email.trim().toLowerCase(),
            password: form.password.trim(),
          }
        : {
            name: form.name.trim(),
            email: form.email.trim().toLowerCase(),
            password: form.password.trim(),
          };

      const response = await axios.post(url, payload);

      // 🟢 Save correct returned values
      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("userEmail", response.data.email);

      alert(response.data.message);

      onClose();
      window.location.reload(); // Refresh UI to update header

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Create an Account"}</h2>

        {!isLogin && (
          <input
            type="text"
            name="name"
            className="auth-input"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          className="auth-input"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          className="auth-input"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            className="auth-input"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        )}

        <button className="auth-button" onClick={handleSubmit}>
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          className="toggle-text"
          onClick={() => {
            setIsLogin(!isLogin);
            setForm({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
          }}
        >
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
