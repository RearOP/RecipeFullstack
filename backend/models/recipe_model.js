const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    ingredients: {
      type: Array,
      default: [],
    },
    steps: {
      type: Array,
      default: [],
    },
    imageUrl: String,
    category: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    // Ratings summary
    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    ratingsCountByStars: {
      type: Map,
      of: Number,
      default: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    },

    commentCount: { type: Number, default: 0 },

    // Saved recipes
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("recipe", RecipeSchema);
