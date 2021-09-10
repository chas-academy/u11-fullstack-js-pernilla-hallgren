const express = require("express");
const { login } = require("../../controllers/auth.controller.js");

const router = express.Router();

// POST api/users - login auth user - use middleware here
router.post("/", login);

module.exports = router;
