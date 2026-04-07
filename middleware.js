const jwt = require("jsonwebtoken");
const {userModel} = require("./models")

function authMiddleware(req, res, next) {

    const token = req.headers.token;
    const decode = jwt.verify(token, "shubham123")
    const userExist = userModel.findOne({
        id: decode.userId
    })
    if(!userExist) {
        res.status(404).json({
            message: "User not found"
        })
        return;
    }

    req.userId = decode.userId;
    next()
}

module.exports = {
    authMiddleware: authMiddleware
}