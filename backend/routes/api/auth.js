const express = require("express");
const { login, getUserById } = require("../../controllers/auth.controller.js");
const auth = require("../../middleware/auth.middleware.js");

const router = express.Router();

// POST api/users - login auth user - use middleware here
router.post("/", login);
router.get("/user", auth, getUserById);

module.exports = router;
