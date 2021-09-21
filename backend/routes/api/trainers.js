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
// router.get("/review", auth, getReviewByTrainerId);
router.post("/", authAdmin, createTrainer);
// router.delete("/:id", authAdmin, deleteTrainer);

module.exports = router;
