const express = require("express");
const router = express.Router();

// Controller
const {register, login, getCurrentUser} = require("../controllers/usercontroller");

// Middleware
const validate = require("../middlewares/handlevalidation");
const {userCreateValidation, loginValidation} = require("../middlewares/uservalidation");
const authSec = require("../middlewares/authsec");

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authSec, getCurrentUser);

module.exports = router;