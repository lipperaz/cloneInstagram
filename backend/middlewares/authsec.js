const User = require("../models/user")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_PASSWORD

const authSec = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Check Header have Token
    if(!token) return res.status(401).json({errors: ["Acesso negado!"]});

    // Check Token valid
    try {
        const verified = jwt.verify(token, jwtSecret);
        req.user = await User.findById(verified.id).select("-password");
        next();

    } catch (error) {
        res.status(401).json({errors: ["Token invalido!"]});
    }
};

module.exports = authSec;