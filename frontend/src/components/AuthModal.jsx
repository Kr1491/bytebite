import axios from "axios";

const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    alert("✅ Login successful");
    setUserEmail(email);
    onClose();
  } catch (err) {
    alert("❌ Invalid email or password");
  }
};

const handleSignup = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      name,
      email,
      password,
    });
    alert("✅ Signup successful");
    setUserEmail(email);
    onClose();
  } catch (err) {
    alert("❌ Error creating account");
  }
};
