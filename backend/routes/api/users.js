const express = require("express");
const {
  register,
  getAllUsers,
} = require("../../controllers/user.controller.js");

const router = express.Router();

// POST api/users - register new user
router.post("/", register);

// GET api/users - get all users - add auth with role admin
// router.get("/", getAllUsers);

module.exports = router;
