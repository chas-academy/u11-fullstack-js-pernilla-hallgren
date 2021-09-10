const express = require("express");
const register = require("../../controllers/user.controller.js");

const router = express.Router();

// POST api/users - register new user
router.post("/", register);

module.exports = router;
