const express = require("express");
const router = express.Router();

// Controller
const {register, login, getCurrentUser, update} = require("../controllers/usercontroller");

// Middleware
const validate = require("../middlewares/handlevalidation");
const {userCreateValidation, loginValidation, userUpdateValidation} = require("../middlewares/uservalidation");
const authSec = require("../middlewares/authsec");
const { imageUpload } = require("../middlewares/uploadimage");

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authSec, getCurrentUser);
router.put("/", authSec, userUpdateValidation(), validate, imageUpload.single("profileImage"), update);

module.exports = router;