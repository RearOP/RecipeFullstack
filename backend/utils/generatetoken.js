const jwt = require("jsonwebtoken");

const generateToken = (reguser)=>{
    return jwt.sign({email:reguser.email , id : reguser.id}, process.env.JWT_KEY)
}
module.exports.generateToken = generateToken;