const express = require("express");
const router = express.Router();

// Controller
const {register, login} = require("../controllers/usercontroller");

// Middleware
const validate = require("../middlewares/handlevalidation");
const {userCreateValidation, loginValidation} = require("../middlewares/uservalidation");

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);

module.exports = router;