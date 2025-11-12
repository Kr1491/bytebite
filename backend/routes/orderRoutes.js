import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// POST new order
router.post("/", async (req, res) => {
  try {
    const { userEmail, items, total } = req.body;

    if (!userEmail || !items || !total) {
      return res.status(400).json({ message: "Missing order details" });
    }

    const order = new Order({
      userEmail,
      items,
      total,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
});

export default router;
