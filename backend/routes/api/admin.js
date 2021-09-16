const express = require("express");
const {
  getAllUsers,
  deleteUser,
} = require("../../controllers/admin.controller.js");
const authAdmin = require("../../middleware/admin.middleware.js");

const router = express.Router();

// POST  - login auth user - use middleware here
router.get("/admin", authAdmin, getAllUsers);
router.delete("/admin/delete-user/:id", authAdmin, deleteUser);

module.exports = router;
