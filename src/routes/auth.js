const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.sign_up);
router.post("/signin", authController.sign_in);

module.exports = router;
