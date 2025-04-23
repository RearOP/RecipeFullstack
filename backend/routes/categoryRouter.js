const express = require("express");
const router = express.Router();
const category_model = require("../models/category_model");
const isloggedin = require("../middlewares/IsloggedIn");
const slugify = require("slugify");

router.post("/create", isloggedin, async (req, res) => {
  try {
    // console.log("Incoming category create request");
    // console.log("Request body:", req.body);

    let { name, slug } = req.body;

    const categorySlug = slug
      ? slugify(slug, { lower: true })
      : slugify(name, { lower: true });

    const existingCategory = await category_model.findOne({
      slug: categorySlug,
    });

    if (existingCategory) {
      return res.status(409).json({ message: "This category already exists" });
    }

    const newCategory = await category_model.create({
      name,
      slug: categorySlug,
    });

    res.status(200).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
