const express = require("express");
const {
  getUserById,
  editUser,
} = require("../../controllers/auth.controller.js");
const auth = require("../../middleware/auth.middleware.js");

const router = express.Router();

router.get("/profile", auth, getUserById);
router.patch("/profile/edit/:id", auth, editUser);

module.exports = router;
