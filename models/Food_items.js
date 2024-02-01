const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
  },
  name: {
    type: String,
  },
  img: [],
  options: [],
  price:[],
  description: {
    type: String,
  },
});

module.exports = mongoose.model("food_items",FoodSchema);