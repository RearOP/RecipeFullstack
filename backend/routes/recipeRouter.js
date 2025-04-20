const express = require("express");
const IsloggedIn = require("../middlewares/IsloggedIn");
const recipeModel = require("../models/recipe_model");
const upload = require("../config/multer-config");
const router = express.Router();

router.post("/create", IsloggedIn, upload.single("image"), async (req, res) => {
  try {
    let { title, description, ingredients, steps, category } = req.body;

    ingredients = JSON.parse(ingredients);
    steps = JSON.parse(steps);
    const imageBuffer = req.file.buffer;
    console.log("Uploaded file:", req.file);

    const CreateRecipe = await recipeModel.create({
      title,
      description,
      ingredients,
      steps,
      category,
      imageUrl: imageBuffer,
      createdBy: req.user._id,
    });
    res.status(201).json({ success: true, CreateRecipe });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
