import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, default: 1 }
});

export default mongoose.model("CartItem", cartItemSchema);
