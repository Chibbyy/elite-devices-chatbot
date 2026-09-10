const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);