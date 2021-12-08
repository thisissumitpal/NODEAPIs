const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET
const userModel = require("../models/user"); // user model with schema
const userManagementModel = require("../models/userManagement");
module.exports = (req, res, next) => {
    // check header or url parameters or post parameters for token
    var token =
        (req.headers.authorization ? req.headers.authorization.split(" ")[1] : "")
        ||
        (req.body && req.body.access_token) || req.body.token || req.query.token
        ||
        req.headers["x-access-token"];
        // console.log(req.header);
    try {
        const decode = jwt.verify(token, JWT_SECRET);
        //console.log(decode);
        if (decode) {
            userManagementModel
                .findOne({ _id: decode.id })
                .then((user) => {
                    if (user.role == 'admin') {
                        req.userData = user;
                        next();
                    } else {
                        res.status(401).json({
                            status: 401,
                            message: "Permission denied",
                        });
                    }
                })
                .catch((er) => {
                    res.status(401).json({
                        Code: 5,
                        message: "Session Expired.",
                    });
                });
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({
            Code: 5,
            message: "Session Expired.",
        });
    }
};