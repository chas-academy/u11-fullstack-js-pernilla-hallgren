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

  // if (!username || !email) {
  //   return res.status(400).json({ msg: "Please enter all fields" });
  // }

  // Trainer.findOne({ email }).then((user) => {
  //   if (user) return res.status(400).json({ msg: "Trainer already exists" });

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
  // });
};

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTrainer,
  getAllTrainers,
};
