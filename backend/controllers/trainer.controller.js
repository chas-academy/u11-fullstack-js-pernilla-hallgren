require("dotenv").config();

const Trainer = require("../models/Trainer.model");
const Review = require("../models/Review.model");
// const User = require("../models/User.model");

const createTrainer = (req, res) => {
  const {
    username,
    email,
    firstName,
    lastName,
    role,
    image,
    description,
    skills,
  } = req.body;

  const newTrainer = new Trainer({
    username,
    email,
    firstName,
    lastName,
    role,
    image,
    description,
    skills,
  });
  newTrainer.save().then((trainer) => res.json(trainer));
  // newTrainer.save().then((trainer) => { req.trainer.review.push(trainer.id)
  //   res.json(trainer) });
};

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchTrainerBySkills = async (req, res) => {
  const { skills } = req.query;

  try {
    const searchResult = await Trainer.find({
      skills: { $regex: skills, $options: "i", $exists: true, $ne: null },
    });

    if (!searchResult || searchResult.length === 0) {
      return res.status(400).send({ message: "No skills found" });
    }
    res.status(200).json({ searchResult });
  } catch (err) {
    res.status(500).send({ message: "Server issues" });
  }
};

const createReview = async (req, res) => {
  console.log("hello");
  const { text, rating } = req.body;
  console.log(req.body);
  try {
    const newReview = await new Review({
      text,
      rating,
      user: req.user.id,
      trainer: req.params.id,
    });
    newReview.save().then((review) => res.json(review));
  } catch (err) {
    res.status(500).send({ message: "Server issues" });
  }
};

const getReviewByTrainerId = async (req, res) => {
  try {
    const review = await Review.find({ trainer: req.params.id })
      .populate("trainer")
      .populate("user");
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTrainer,
  getAllTrainers,
  searchTrainerBySkills,
  getReviewByTrainerId,
  createReview,
};
