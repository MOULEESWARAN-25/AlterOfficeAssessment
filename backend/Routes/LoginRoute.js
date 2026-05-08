const LoginController = require("../Controller/LoginController");
const express = require("express");
const router = express.Router();

router.post("/", LoginController.Login);
module.exports = router;
