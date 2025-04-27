const express = require("express");
const router = express.Router();
const category_model = require("../models/category_model");
const isloggedin = require("../middlewares/IsloggedIn");
const verifyToken = require("../middlewares/verifytoken");
const slugify = require("slugify");

router.post("/create",verifyToken,isloggedin, async (req, res) => {
  try {
    let { name, slug, subcategories } = req.body;

    const categorySlug = slug
      ? slugify(slug, { lower: true })
      : slugify(name, { lower: true });

    const existingCategory = await category_model.findOne({
      slug: categorySlug,
    });

    if (existingCategory) {
      return res.status(409).json({ message: "This category already exists" });
    }

    // Format and slugify each subcategory if provided
    let formattedSubcategories = [];
    if (Array.isArray(subcategories)) {
      formattedSubcategories = subcategories.map((sub) => ({
        name: sub.name,
        slug: slugify(sub.name, { lower: true }),
      }));
    }

    const newCategory = await category_model.create({
      name,
      slug: categorySlug,
      subcategories: formattedSubcategories,
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

router.get("/showcategory", async (req, res) => {
  try {
    const categories = await category_model.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
