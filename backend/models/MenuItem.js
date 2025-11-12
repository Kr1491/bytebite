import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  name: String,
  price: Number,
  description: String,
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
