const SignUpController = require("../Controller/SignUpController");
const express = require("express");
const router = express.Router();

router.post("/", SignUpController.CreateUser);
module.exports = router;

