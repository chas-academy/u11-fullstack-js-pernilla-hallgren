const express = require("express");
const {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
} = require("../../controllers/admin.controller.js");
const authAdmin = require("../../middleware/admin.middleware.js");

const router = express.Router();

// POST  - login auth user - use middleware here

router.get("/", authAdmin, getAllUsers);
router.post("/users", authAdmin, createUser);
router.patch("/users/:id", authAdmin, editUser);
router.delete("/users/:id", authAdmin, deleteUser);

module.exports = router;
