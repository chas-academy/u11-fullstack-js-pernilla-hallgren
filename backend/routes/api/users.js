const express = require("express");
const {
  register,
  login,
  getAllUsers,
} = require("../../controllers/user.controller.js");

const router = express.Router();

// POST api/users - register new user
router.post("/register", register);
router.post("/login", login);

// GET api/users - get all users - add auth with role admin
// router.get("/", getAllUsers);

module.exports = router;
