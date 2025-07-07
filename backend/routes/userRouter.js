const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require("../models/user_model")

const {
  registeruser,
  loginUser,
  logout,
  googleAuth,
  googleCallback,
} = require("../controller/authController");

const IsloggedIn = require("../middlewares/IsloggedIn");
const { generateToken } = require("../utils/generatetoken");

router.post("/register", registeruser);

router.post("/login", loginUser);

router.get("/logout", IsloggedIn, logout);
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
// routes/userRouter.js (add below the others)

router.post("/google/token", async (req, res) => {
  const { id_token } = req.body;
  try {
    // ① verify the ID-token is really from Google
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // ② find-or-create user
    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.create({
        fullname: name,
        email,
        googleId,
        avatar: picture,
      });
    }

    // ③ issue your own JWT & cookie
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.json({ message: "Google auth OK", token });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid Google token" });
  }
});

module.exports = router;
