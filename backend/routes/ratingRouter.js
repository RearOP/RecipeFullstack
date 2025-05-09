const express = require("express");
const ratingModel = require("../models/rating_model");
const router = express.Router();
const IsloggedIn = require("../middlewares/IsloggedIn");
const Recipe = require("../models/recipe_model");
// const verifyToken = require("../middlewares/verifytoken");

router.post("/giverating/:id", IsloggedIn, async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user.id;
    const { rating } = req.body;

    // Upsert (insert or update) into Rating model
    const updatedRating = await ratingModel.findOneAndUpdate(
      { recipe: recipeId, user: userId },
      { recipe: recipeId, user: userId, rating },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Recalculate stats for the recipe
    const allRatings = await ratingModel.find({ recipe: recipeId });
    const totalRatings = allRatings.length;
    const sumRatings = allRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = sumRatings / totalRatings;

    const ratingsCountByStars = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    allRatings.forEach((r) => {
      ratingsCountByStars[r.rating] = (ratingsCountByStars[r.rating] || 0) + 1;
    });

    // Update Recipe document
    await Recipe.findByIdAndUpdate(recipeId, {
      averageRating,
      totalRatings,
      ratingsCountByStars,
    });

    res.json({
      success: true,
      message: "Rating submitted and recipe updated.",
    });
  } catch (error) {
    console.error("Error giving rating:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

router.get("/user/:recipeId", IsloggedIn, async (req, res) => {
  try {
    const rating = await ratingModel.findOne({
      recipe: req.params.recipeId,
      user: req.user._id,
    });

    res.status(200).json({ success: true, rating: rating?.rating || 0 });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch user rating" });
  }
});

module.exports = router;
