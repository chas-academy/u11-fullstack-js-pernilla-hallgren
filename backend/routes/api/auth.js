const express = require("express");
const { getUserById, logout } = require("../../controllers/auth.controller.js");
const auth = require("../../middleware/auth.middleware.js");

const router = express.Router();

// POST api/users - login auth user - use middleware here
// router.post("/", login);
router.get("/profile", auth, getUserById);
router.get("/logout", auth, logout);

module.exports = router;
