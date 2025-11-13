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
// 1️⃣ Create app FIRST
// -------------------------
const app = express();

// -------------------------
// 2️⃣ Middleware
// -------------------------
app.use(cors());
app.use(express.json());

// -------------------------
// 3️⃣ Paths (for images folder)
// -------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// -------------------------
// 4️⃣ Routes
// -------------------------
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// -------------------------
// 5️⃣ MongoDB Connection
// -------------------------
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/bytebite", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// -------------------------
// 6️⃣ Base route
// -------------------------
app.get("/", (req, res) => {
  res.send("ByteBite API running...");
});

// -------------------------
// 7️⃣ Start Server
// -------------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
