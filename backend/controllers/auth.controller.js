require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const auth = require("../../middleware/auth");
const User = require("../models/User.model");

const jwtSecret = process.env.JWT_SECRET;

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add this to auth instead
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const logout = (req, res) => {
  // res.clearCookie('token').status(200).json({ message: "Success!"})
  res.cookie(token, "", { maxAge: 1 });
};

module.exports = {
  getUserById,
  logout,
};
