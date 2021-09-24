require("dotenv").config();

const User = require("../models/User.model");

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server issues" });
  }
};

const editUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body)
    .select("-password")
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          msg: "Cannot update user",
        });
        // res.json(data);
      } else {
        res.send({
          msg: "User was updated successfully!",
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
