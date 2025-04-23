const jwt = require("jsonwebtoken");

const generateToken = (reguser)=>{
    return jwt.sign({email:reguser.email , id : reguser.id ,role: reguser.role, }, process.env.JWT_KEY)
}
module.exports.generateToken = generateToken;