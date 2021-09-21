require("dotenv").config();

const User = require("../models/User.model");

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    // .populate("reviews")
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update user",
        });
        // res.json(data);
      } else {
        res.send({
          message: "User was updated successfully!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Could not update user",
      });
    });
};

//OBS! Används denna!
const logout = (req, res) => {
  // res.clearCookie('token').status(200).json({ message: "Success!"})
  res.cookie(token, "", { maxAge: 1 });
};

module.exports = {
  getUserById,
  logout,
  editUser,
};
