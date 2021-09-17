require("dotenv").config();
const User = require("../models/User.model");

// Add this to auth instead
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editUser = async (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. User cannot be found`,
        });
        res.json(data);
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
        res.status(404).send({
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
  editUser,
  deleteUser,
};
