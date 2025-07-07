const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ loggedIn: false, message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY); // use your secret
    // console.log("Decoded JWT:", decoded);
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (err) {
    console.log("Invalid token");
    return res.status(401).json({ loggedIn: false, message: "Invalid token" });
  }
};

module.exports = verifyToken;
