require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  let token = req.header("x-auth-token");

  if (!token)
    res.status(401).json({
      isLoggedIn: false,
      msg: "No token, authorization denied",
    });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({
      isLoggedIn: false,
      msg: "Token is not valid",
    });
  }
};

module.exports = auth;
