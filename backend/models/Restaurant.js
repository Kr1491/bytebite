import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  timeRange: String,
  distance: String,
  rating: Number,
  imagePath: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
