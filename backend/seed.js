import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "./models/Restaurant.js";
import MenuItem from "./models/MenuItem.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bytebite";

await mongoose.connect(MONGO_URI);
console.log("Connected to MongoDB");

await Restaurant.deleteMany();
await MenuItem.deleteMany();

const restaurants = await Restaurant.insertMany([
  {
    name: "Hornbill",
    cuisine: "South Indian, North Indian",
    timeRange: "15-20 min",
    distance: "0.5 km",
    rating: 4.5,
    imagePath: "/images/homepage.png",
  },
  {
    name: "SKM",
    cuisine: "Multi-Cuisine, Snacks",
    timeRange: "10-15 min",
    distance: "0.3 km",
    rating: 4.3,
    imagePath: "/images/homepage.png",
  },
  {
    name: "Food Court",
    cuisine: "Chinese, Continental, Indian",
    timeRange: "20-25 min",
    distance: "0.7 km",
    rating: 4.4,
    imagePath: "/images/homepage.png",
  },
]);

await MenuItem.insertMany([
  { restaurantId: restaurants[0]._id, name: "Masala Dosa", price: 60, description: "Crispy dosa with potato filling" },
  { restaurantId: restaurants[0]._id, name: "Idli Sambar", price: 50, description: "Soft idlis with sambar" },
  { restaurantId: restaurants[1]._id, name: "Paneer Roll", price: 70, description: "Spicy paneer roll" },
  { restaurantId: restaurants[2]._id, name: "Fried Rice", price: 80, description: "Veg fried rice with sauces" },
]);

console.log("Data seeded ✅");
await mongoose.disconnect();
