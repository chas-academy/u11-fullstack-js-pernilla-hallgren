require("dotenv").config();

const Trainer = require("../models/Trainer.model");
const Review = require("../models/Review.model");

const createTrainer = async (req, res) => {
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
  try {
    const newTrainer = await new Trainer({
      username,
      email,
      firstName,
      lastName,
      role,
      image,
      description,
      skills: skills.split(/[ ,]+/),
    });
    newTrainer.save().then((trainer) => res.json(trainer));
  } catch (err) {
    res.status(500).send({ msg: "Server issues" });
  }
};

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ register_date: "desc" });
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ msg: "Server issues" });
  }
};

const searchTrainerBySkills = async (req, res) => {
  const { skills } = req.query;

  try {
    const searchResult = await Trainer.find({
      skills: { $regex: skills, $options: "i", $exists: true, $ne: null },
    });

    if (!searchResult || searchResult.length === 0) {
      return res.status(400).send({ msg: "No skills found" });
    }
    res.status(200).json({ searchResult });
  } catch (err) {
    res.status(500).send({ msg: "Server issues" });
  }
};

const createReview = async (req, res) => {
  const { text, rating } = req.body;
  try {
    const newReview = await new Review({
      text,
      rating,
      user: req.user.id,
      trainer: req.params.id,
    });
    newReview.save().then(async (review) => {
      await review.populate("user", "username");
      // console.log({ review: review.populate("user", "username") });
      res.json(review);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server issues" });
  }
};

const getReviewByTrainerId = async (req, res) => {
  try {
    const review = await Review.find({ trainer: req.params.id })
      .sort({ createdAt: "desc" })
      .populate("trainer")
      .populate("user", "username");
    res.json(review);
  } catch (err) {
    res.status(500).json({ msg: "Server issues" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (req.user.id != review.user._id.toString())
      return res.status(401).send({ msg: "Not authorized for this action" });
    await review.delete();
    res.send("Successfully deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "Could not delete review, server issues",
    });
  }
};

module.exports = {
  createTrainer,
  getAllTrainers,
  searchTrainerBySkills,
  getReviewByTrainerId,
  createReview,
  deleteReview,
};
