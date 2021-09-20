require("dotenv").config();

const Trainer = require("../models/Trainer.model");

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
};

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const searchTrainers = async (req, res) => {
//   const { skills } = req.query;

//   try {
//     const trainerSkills = await Trainer.find({
//       skills: { $regex: skills, $options: "i", $exists: true, $ne: null },
//     }).sort({ createdAt: "desc" });

//     if (trainerSkills.length === 0) {
//       res.status(404).json({ message: "No skills found" });
//     }
//     res.status(200).json({ skills });
//     console.log();
//   } catch (err) {
//     res.status(400).json({ error: error.message });
//   }
// };

module.exports = {
  createTrainer,
  getAllTrainers,
  // searchTrainers,
};
