const express = require("express");
const IsloggedIn = require("../middlewares/IsloggedIn");
const recipeModel = require("../models/recipe_model");
const upload = require("../config/multer-config");
const verifyToken = require("../middlewares/verifytoken");
const router = express.Router();

router.post(
  "/create",
  IsloggedIn,
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      let {
        title,
        description,
        ingredients,
        steps,
        category,
        subcategory,
        activeTime,
        totalTime,
        servings,
      } = req.body;

      ingredients = JSON.parse(ingredients);
      steps = JSON.parse(steps);
      const imageBuffer = req.file.buffer;

      const CreateRecipe = await recipeModel.create({
        title,
        description,
        ingredients,
        steps,
        category,
        subcategory,
        activeTime,
        totalTime,
        servings,
        imageUrl: imageBuffer,
        createdBy: req.user.id,
      });

      res.status(201).json({ success: true, CreateRecipe });
    } catch (err) {
      // console.error(err.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

router.post("/saveRecipeForUser", async (req, res) => {
  try {
    const { recipeId, userId } = req.body;
    // console.log(req.body);

    const recipe = await recipeModel.findById(recipeId);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    // Avoid duplicate saves
    if (!recipe.savedBy.includes(userId)) {
      recipe.savedBy.push(userId);
      await recipe.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Recipe saved successfully" });
  } catch (err) {
    // console.error("Error saving recipe for user:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post(
  "/unsaveRecipeForUser",
  IsloggedIn,
  verifyToken,
  async (req, res) => {
    try {
      const { recipeId, userId } = req.body;
      // console.log("Unsave request:", { recipeId, userId });

      const recipe = await recipeModel.findByIdAndUpdate(
        recipeId,
        { $pull: { savedBy: userId } },
        { new: true }
      );

      if (!recipe) {
        return res
          .status(404)
          .json({ success: false, message: "Recipe not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Recipe unsaved successfully" });
    } catch (err) {
      console.error("Error unsaving recipe:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

router.get("/showrecipes", async (req, res) => {
  try {
    const recipes = await recipeModel.find().populate("createdBy", "fullname");

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
    // console.error("Error in showrecipes:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/recipeDetails/:id", IsloggedIn, verifyToken, async (req, res) => {
  try {
    const recipe = await recipeModel
      .findById(req.params.id)
      .populate("createdBy", "fullname");

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    const recipeObj = recipe.toObject();

    if (recipe.imageUrl && Buffer.isBuffer(recipe.imageUrl)) {
      recipeObj.imageUrl = `data:image/jpeg;base64,${recipe.imageUrl.toString(
        "base64"
      )}`;
    } else {
      recipeObj.imageUrl = null;
    }

    res.json(recipeObj);
  } catch (err) {
    // console.error("Error in recipeDetails:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/showrecipesDetailpage", async (req, res) => {
  try {
    const recipes = await recipeModel
      .find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(6) // Limit to 6 recipes
      .populate("createdBy", "fullname");

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
    // console.error("Error in showrecipes:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const recipes = await recipeModel.find({ savedBy: req.params.userId });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
