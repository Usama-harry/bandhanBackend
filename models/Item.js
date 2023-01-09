const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.Schema = itemSchema = {
  catId: { type: Schema.Types.ObjectId, ref: "Category" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  prices: { type: {}, required: true },
};

module.exports.Model = mongoose.model("Item", itemSchema);
