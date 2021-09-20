const express = require("express");
const auth = require("../../middleware/auth.middleware.js");
const {
  createTrainer,
  getAllTrainers,
} = require("../../controllers/trainer.controller");

const router = express.Router();

router.get("/", auth, getAllTrainers);
router.post("/", auth, createTrainer);

module.exports = router;
