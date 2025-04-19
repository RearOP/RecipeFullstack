const express = require("express");
const upload = require("../config/multer-config");

const router = express.Router();

const IsloggedIn = require("../middlewares/IsloggedIn");
const user_model = require("../models/user_model");

router.get("/users", IsloggedIn, async (req, res) => {
  const user = await user_model.findById(req.user.id);
  res.json(user);
});

router.post(
  "/updateProfile",
  IsloggedIn,
  upload.single("image"),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await user_model.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const file = req.file;
      const type = req.body.type;
      const { fullname, email } = req.body;

      const updateFields = {};
      if (fullname) updateFields.fullname = fullname;
      if (email) updateFields.email = email;

      if (file && type) {
        const base64Image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
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


module.exports = router;
