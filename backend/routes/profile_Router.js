const express = require("express");
const upload = require("../config/multer-config");
const jwt = require("jsonwebtoken");

const router = express.Router();

const IsloggedIn = require("../middlewares/IsloggedIn");
const user_model = require("../models/user_model");
const recipe_model = require("../models/recipe_model");
const verifyToken = require("../middlewares/verifytoken");

router.get("/users", IsloggedIn, verifyToken ,async (req, res) => {
  // console.log("req.user inside /users route:", req.user); // debug
  const user = await user_model.findById(req.user.id);
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "User not authenticated" });
    // console.log("User not authenticated");
  }  
  res.json(user);
});

router.get("/profilerecipes", IsloggedIn, verifyToken, async (req, res) => {
  try {
    // console.log("req.user inside /profilerecipes route:", req.user); // debug

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const recipes = await recipe_model.find({ createdBy: req.user.id }).populate("createdBy", "fullname");
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
    // console.log(recipes);
  } catch (err) {
    console.error("Error fetching profile recipes:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post(
  "/updateProfile",
  IsloggedIn,
  upload.single("image"),
  async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await user_model.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const file = req.file;
      // geting type from frontend
      const type = req.body.type;

      const { fullname, email } = req.body;

      const updateFields = {};
      if (fullname) updateFields.fullname = fullname;
      if (email) updateFields.email = email;

      if (file && type) {
        const base64Image = `data:${
          file.mimetype
        };base64,${file.buffer.toString("base64")}`;
        if (type === "cover") {
          updateFields.backgroundImage = base64Image;
        } else if (type === "profile") {
          updateFields.profilePic = base64Image;
        }
      }

      await user_model.findByIdAndUpdate(userId, updateFields);

      res.json({ message: "Profile updated successfully" });
      // console.log("Received type:", type);
      // console.log("Saving to field:", type === "profile" ? "profileImage" : "backgroundImage");
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.post("/updateName", IsloggedIn, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userId = req.user._id;
    const { fullname } = req.body;

    await user_model.findByIdAndUpdate(userId, { fullname });

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Update Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/updateEmail", IsloggedIn, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = req.user._id;
    const { email } = req.body;

    // Update email in database
    await user_model.findByIdAndUpdate(userId, { email });

    // Get updated user
    const updatedUser = await user_model.findById(userId).select("-password");

    // Generate new token with updated email
    const newToken = jwt.sign(
      { email: updatedUser.email, id: updatedUser._id },
      process.env.JWT_KEY
    );

    // Set token in cookie
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: false, // set to true if using HTTPS
      sameSite: "Lax",
    });

    res.status(200).json({ message: "User updated and re-authenticated successfully" });
  } catch (err) {
    console.error("Update Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
