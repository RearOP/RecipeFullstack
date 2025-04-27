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
    imageUrl: {
      type: Buffer,
    },
    category: {
      type: String,
      default: "",
    },
    subcategory: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    ratingsCountByStars: {
      type: Map,
      of: Number,
      default: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    },

    commentCount: { type: Number, default: 0 },
    activeTime: {
      type: String,
      default: "",
    },
    totalTime: {
      type: String,
      default: "",
    },
    servings: {
      type: String,
      default: "",
    },
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("recipe", RecipeSchema);
