require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const jwtSecret = process.env.JWT_SECRET;

// Add this to auth instead
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      username,
      email,
      password,
      role,
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
                  role: user.role,
                },
              });
            }
          );
        });
      });
    });
  });
};

const editUser = async (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update user with id=${id}. User cannot be found`,
        });
        // res.json(data);
      } else {
        res.send({
          message: "User was updated successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update user with id=" + id,
      });
    });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot delete user with id=${id}. User cannot be found`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
};

module.exports = {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
};
