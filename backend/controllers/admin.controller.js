require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const jwtSecret = process.env.JWT_SECRET;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server issues" });
  }
};

const createUser = (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email: email.toLowerCase() }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      username,
      email: email.toLowerCase(),
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
          msg: `Cannot update user with id=${id}. User cannot be found`,
        });
      } else {
        return res.send({
          msg: "User was updated successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Could not update user with id=" + id,
      });
    });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          msg: `Cannot delete user with id=${id}. User cannot be found`,
        });
      } else {
        await data.remove();
        return res.send({
          msg: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Could not delete user with id=" + id,
      });
    });
};

module.exports = {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
};
