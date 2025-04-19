const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generatetoken");

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
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  let loguser = await userModel.findOne({ email: email });
  if (!loguser) {
    return res.status(401).json({ message: "Invalid credentials" });
  } else {
    bcrypt.compare(password, loguser.password, function (err, result) {
        if  (result){
            let token = generateToken(loguser);
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
              sameSite: "lax",
            });
            res.send("loggedIN");
        }else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    });
  }
};

module.exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
}