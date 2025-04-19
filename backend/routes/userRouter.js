const express = require("express");

const router = express.Router();

const {
  registeruser,
  loginUser,
  logout,
} = require("../controller/authController");

const IsloggedIn = require("../middlewares/IsloggedIn");

const user_model = require("../models/user_model");

router.post("/register", registeruser);

router.post("/login", loginUser);

router.get("/logout", logout);

router.get("/profile", IsloggedIn, async (req, res) => {
  const user = await user_model.findById(req.user.id);
  //   console.log(user);
  res.json(user);
});

module.exports = router;
