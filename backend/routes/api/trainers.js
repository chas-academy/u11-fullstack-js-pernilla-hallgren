const express = require("express");
const authAdmin = require("../../middleware/admin.middleware.js");
const auth = require("../../middleware/auth.middleware.js");

const {
  createTrainer,
  getAllTrainers,
  searchTrainerBySkills,
} = require("../../controllers/trainer.controller");

const router = express.Router();

router.get("/", authAdmin, getAllTrainers);
router.get("/search", auth, searchTrainerBySkills);
// router.get("/review", auth, getReviewByTrainerId);
router.post("/", authAdmin, createTrainer);
// router.delete("/:id", authAdmin, deleteTrainer);

module.exports = router;
