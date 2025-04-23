const express = require("express");
const IsloggedIn = require("../middlewares/IsloggedIn");
const recipeModel = require("../models/recipe_model");
const upload = require("../config/multer-config");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");


router.post("/create", IsloggedIn, verifyToken ,upload.single("image"), async (req, res) => {
  try {
    let {
      title,
      description,
      ingredients,
      steps,
      category,
      activeTime,
      totalTime,
      servings,
    } = req.body;

    ingredients = JSON.parse(ingredients);
    steps = JSON.parse(steps);
    const imageBuffer = req.file.buffer;
    // console.log("Uploaded file:", req.file);

    const CreateRecipe = await recipeModel.create({
      title,
      description,
      ingredients,
      steps,
      category,
      activeTime,
      totalTime,
      servings,
      imageUrl: imageBuffer,
      createdBy: req.user._id,
    });
    res.status(201).json({ success: true, CreateRecipe });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/showrecipes", IsloggedIn, async (req, res) => {
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
    console.error("Error in showrecipes:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/recipeDetails/:id", IsloggedIn, verifyToken ,async (req, res) => {
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
    console.error("Error in recipeDetails:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
