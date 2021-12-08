const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET
module.exports ={
    generateToken : async(user)=> {
        let payload ={ email : user.email, id :user._id , role :user.role}
        let accessToken =jwt.sign(payload,JWT_SECRET,{
                      algorithm :"HS256",
                      expiresIn :"3d"
        })
                  return accessToken;
    }
}