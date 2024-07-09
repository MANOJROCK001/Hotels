const mongoose = require("mongoose");

// define the menu schema

const menuItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ["sweet", "spicy", "sour"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingradients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});
// create menu modal

const MenuItem = mongoose.model("Menu", menuItemSchema);
module.exports = MenuItem;
