import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import restaurantRoutes from "./routes/restaurantRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// -------------------------
// PATH FIX - REQUIRED FOR STATIC FILES
// -------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// -------------------------
// Middleware
// -------------------------
app.use(cors());
app.use(express.json());

// -------------------------
// STATIC IMAGES FIX 🚨
// -------------------------
app.use("/images", express.static(path.join(__dirname, "public/images")));
// Now http://localhost:5001/images/hornbill.jpeg works

// -------------------------
// Routes
// -------------------------
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// -------------------------
// MongoDB Connection
// -------------------------
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/bytebite", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// -------------------------
// Base route
// -------------------------
app.get("/", (req, res) => {
  res.send("ByteBite API running...");
});

// -------------------------
// Start Server
// -------------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
