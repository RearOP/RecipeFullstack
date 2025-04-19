const express = require("express");

const router = express.Router();

const {
  registeruser,
  loginUser,
  logout,
} = require("../controller/authController");

const IsloggedIn = require("../middlewares/IsloggedIn");

router.post("/register", registeruser);

router.post("/login", loginUser);

router.get("/logout",IsloggedIn,logout);

module.exports = router;
