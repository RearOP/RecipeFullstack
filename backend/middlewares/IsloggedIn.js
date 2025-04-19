const jwt = require("jsonwebtoken");
const userModel = require("../models/user_model");

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);
    
    if (!token) {
      return res.redirect("/signin");
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      const user = await userModel.findOne({ email: decoded.email }).select("-password");
      req.user = user;
      next();
    } catch (error) {
      console.error("JWT Error:", error.message);
      res.clearCookie("token");
      return res.redirect("/signin");
    }
  };