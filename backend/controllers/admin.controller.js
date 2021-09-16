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

// const deleteUser = async (req, res) => {
//   const user = await User.findById(req.user.id);
//   res.json(user);
//   console.log(user);
//   try {
//     await user.deleteOne({ user });
//   } catch (err) {
//     res.status(400).json({ mgs: "Cannot delete user" });
//   }
// };

module.exports = {
  getAllUsers,
  deleteUser,
};
