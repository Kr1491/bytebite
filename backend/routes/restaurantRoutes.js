import express from "express";
import MenuItem from "../models/MenuItem.js";
import Restaurant from "../models/Restaurant.js";


const router = express.Router();

// Get all restaurants
router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

// Get menu for a restaurant
router.get("/:id/menu", async (req, res) => {
  const items = await MenuItem.find({ restaurantId: req.params.id });
  res.json(items);
});

export default router;
