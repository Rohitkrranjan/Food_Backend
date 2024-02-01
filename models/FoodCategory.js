const mongoose = require("mongoose");

const foodCategorySchema = new mongoose.Schema({
  CategoryName: {
    type: String,
  },
});

module.exports = mongoose.model("foodCategory",foodCategorySchema);
