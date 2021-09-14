require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
// const router = require("../routes/api/users");

const jwtSecret = process.env.JWT_SECRET;

const register = (req, res) => {
  // res.send("register");
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // if (!username) {
  //   return res.status(400).json({
  //     error: { type: "username", message: "Please enter a username" },
  //   });
  // }

  // if (!email) {
  //   return res.status(400).json({
  //     error: { type: "email", message: "Please enter a valid email" },
  //   });
  // }

  // if (!password) {
  //   return res.status(400).json({
  //     error: { type: "password", message: "Please enter a password" },
  //   });
  // }

  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      username,
      email,
      password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            jwtSecret,
            { expiresIn: 3600 },
            // callback
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
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

module.exports = {
  register,
  // getAllUsers,
};
