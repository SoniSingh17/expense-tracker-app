const express = require("express")
const { signupValidation , loginValidation } = require("../middlewares/Authvalidation")
const { signup , login } = require("../controllers/AuthController");
const router = express.Router();
router.post('/login' , loginValidation , login);
router.post('/sign-up' , signupValidation, signup);

module.exports = router;
