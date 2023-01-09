const mongoose = require("mongoose");

const Item = require("./Item");

const Schema = mongoose.Schema;

const categorySchema = {
  name: { type: String, required: true },
  priorty: { type: Number, required: true },
  items: { type: [Item.Schema], required: true },
};

module.exports = mongoose.model("Category", categorySchema);
