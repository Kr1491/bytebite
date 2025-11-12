import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// serve images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// routes
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/cart", cartRoutes);

// connect mongo
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/bytebite")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => res.send("ByteBite API running..."));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
