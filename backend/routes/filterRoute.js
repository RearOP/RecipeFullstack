const express = require("express");
const recipeModel = require("../models/recipe_model");
const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    const recipes = await recipeModel
      .find()
      .populate("createdBy", "fullname")
      .sort({ createdAt: -1 });

    const recipesWithImages = recipes.map((recipe) => {
      const recipeObj = recipe.toObject();

      if (recipe.imageUrl && Buffer.isBuffer(recipe.imageUrl)) {
        recipeObj.imageUrl = `data:image/jpeg;base64,${recipe.imageUrl.toString(
          "base64"
        )}`;
      } else {
        recipeObj.imageUrl = null;
      }

      return recipeObj;
    });

    res.json(recipesWithImages);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/topRated", async (req, res) => {
  try {
    const recipes = await recipeModel
      .find()
      .populate("createdBy", "fullname")
      .sort({ averageRating: -1 }); // fixed to sort high to low

    const recipesWithImages = recipes.map((recipe) => {
      const recipeObj = recipe.toObject();

      if (recipe.imageUrl && Buffer.isBuffer(recipe.imageUrl)) {
        recipeObj.imageUrl = `data:image/jpeg;base64,${recipe.imageUrl.toString(
          "base64"
        )}`;
      } else {
        recipeObj.imageUrl = null;
      }

      return recipeObj;
    });

    res.json(recipesWithImages);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
