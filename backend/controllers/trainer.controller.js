require("dotenv").config();

const Trainer = require("../models/Trainer.model");
// const User = require("../models/User.model");

const createTrainer = (req, res) => {
  const {
    username,
    email,
    firstName,
    lastName,
    role,
    avatar,
    description,
    skills,
  } = req.body;

  const newTrainer = new Trainer({
    username,
    email,
    firstName,
    lastName,
    role,
    avatar,
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
      res.status(400).json({ message: "No skills found" });
    }
    res.status(200).json({ searchResult });
    console.log();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getReviewByTrainerId = async (req, res) => {
//   try {
//     const review = await Review.findById(req.trainer.id).select("-password");
//     res.json(review);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = {
  createTrainer,
  getAllTrainers,
  searchTrainerBySkills,
};
