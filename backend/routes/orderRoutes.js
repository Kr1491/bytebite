import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Place order
router.post("/", async (req, res) => {
  console.log("REQ BODY:", req.body);
  try {
    const { userEmail, items, subtotal, deliveryFee, finalAmount } = req.body;

    if (!userEmail || !items?.length || !subtotal || !finalAmount) {
      return res.status(400).json({
        error: "Missing required order details",
      });
    }

    const newOrder = new Order({
      userEmail,
      items,
      subtotal,
      deliveryFee: deliveryFee ?? 20,
      finalAmount,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ error: "Server error while placing order" });
  }
});

export default router;
