import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userEmail, items, total, deliveryFee } = req.body;

    if (!userEmail || !items || items.length === 0 || !total) {
      return res.status(400).json({ error: "Missing required order details" });
    }

    const order = new Order({
      userEmail,
      items,
      subtotal: total,
      deliveryFee: deliveryFee ?? 20,
      finalAmount: total + (deliveryFee ?? 20),
      status: "Paid"
    });

    await order.save();

    res.json({ message: "Order stored", order });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
