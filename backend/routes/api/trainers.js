const express = require("express");
const authAdmin = require("../../middleware/admin.middleware.js");
const {
  createTrainer,
  getAllTrainers,
} = require("../../controllers/trainer.controller");

const router = express.Router();

router.get("/", authAdmin, getAllTrainers);
router.post("/", authAdmin, createTrainer);

module.exports = router;
