const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generatetoken");
const passport = require("passport");

module.exports.registeruser = async (req, res) => {
  try {
    // console.log("BODY:", req.body);
    let { fullname, email, password } = req.body;
    let checkuser = await userModel.findOne({ email: email });
    if (checkuser) {
      return res.status(401).json({ message: "User already exists" });
    }
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return res.status(500).json({ message: "Internal  error" });
      } else {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) {
            return res.status(500).json({ message: "Internal server error" });
          } else {
            let reguser = await userModel.create({
              fullname: fullname,
              email: email,
              password: hash,
            });
            let token = generateToken(reguser);
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
              sameSite: "lax",
            });
            res.status(200).json({ message: "Registration successful" });
          }
        });
      }
    });
  } catch (error) {
    // console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const loguser = await userModel.findOne({ email: email });

  if (!loguser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  bcrypt.compare(password, loguser.password, function (err, result) {
    if (result) {
      const token = generateToken(loguser);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      // Send role info in response
      res.status(200).json({ message: "loggedIn", role: loguser.role });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });
};

// google authentication
exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Step 2: Google callback
exports.googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false },
    (err, user, info) => {
      // console.log("-- GOOGLE CALLBACK --");
      // console.log("err :", err);
      // console.log("user:", user);
      // console.log("info:", info);   // Google may put the reason here

      if (err)   return next(err);
      if (!user) return res.status(401).json({ message: "Google auth failed", info });

      const token = generateToken(user);
      res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false });
      return res.json({ message: "Google auth OK", token });
    }
  )(req, res, next);                  // <-- invoke the inner function
};

module.exports.logout = async (req, res) => {
  // console.log("Logout hit");
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax", // or "Strict" if that's what you used before
    secure: false, // IMPORTANT: false if running on HTTP (localhost)
  });
  res.status(200).json({ message: "Logged out successfully" });
};
