// models/Rating.js
const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipe",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
  },
  { timestamps: true }
);

RatingSchema.index({ recipe: 1, user: 1 }, { unique: true }); // Prevent duplicate ratings

module.exports = mongoose.model("rating", RatingSchema);