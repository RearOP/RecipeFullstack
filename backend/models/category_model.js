const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  }, // optional: useful for URLs like /categories/breakfast
  createdAt: {
    type: Date,
    default: Date.now,
  }, // optional: e.g., category icon
});

module.exports = mongoose.model("category", categorySchema);
