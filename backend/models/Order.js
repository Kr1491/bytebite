import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  deliveryFee: {
    type: Number,
    default: 20,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
