require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const authAdmin = (req, res, next) => {
  let token = req.header("x-auth-token");

  if (!token)
    res.status(401).json({
      isLoggedIn: false,
      msg: "No token, authorization denied",
    });

  // if (user.role !== "admin") {
  //   res.status(401).json({
  //     isLoggedIn: false,
  //     msg: "Sorry, you are not authorized ",
  //   });
  // }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;

    if (!req.user.role === "admin") {
      res.status(401).json({
        isLoggedIn: false,
        msg: "Sorry, you are not authorized ",
      });
    }

    next();
  } catch (err) {
    res.status(400).json({
      isLoggedIn: false,
      msg: "Token is not valid",
    });
  }
};

module.exports = authAdmin;
