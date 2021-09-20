const express = require("express");
const authAdmin = require("../../middleware/admin.middleware.js");
const auth = require("../../middleware/auth.middleware.js");

const {
  createTrainer,
  getAllTrainers,
  // searchTrainers,
} = require("../../controllers/trainer.controller");

const router = express.Router();

router.get("/", authAdmin, getAllTrainers);
// router.get("/search", auth, searchTrainers);
router.post("/", authAdmin, createTrainer);

module.exports = router;
