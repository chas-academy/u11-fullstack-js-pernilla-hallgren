const express = require("express");
const {
  register,
  getAllUsers,
} = require("../../controllers/user.controller.js");

const router = express.Router();

// POST api/users - register new user
router.post("/", register);

router.get("/", getAllUsers);

module.exports = router;
