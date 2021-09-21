const express = require("express");
const {
  register,
  login,
  getAllUsers,
} = require("../../controllers/user.controller.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
