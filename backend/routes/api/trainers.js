const express = require("express");
const authAdmin = require("../../middleware/admin.middleware.js");
const auth = require("../../middleware/auth.middleware.js");

const {
  createTrainer,
  getAllTrainers,
  searchTrainerBySkills,
  getReviewByTrainerId,
  createReview,
  deleteReview,
} = require("../../controllers/trainer.controller");

const router = express.Router();

router.get("/", authAdmin, getAllTrainers);
router.get("/search", auth, searchTrainerBySkills);
router.get("/:id", auth, getReviewByTrainerId);
router.delete("/:id", auth, deleteReview);
router.post("/:id/reviews", auth, createReview);
router.post("/", authAdmin, createTrainer);

module.exports = router;
