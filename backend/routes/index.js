const express = require("express");
const userRouter = require("./api/users");
const trainerRouter = require("./api/trainers");
const adminRouter = require("./api/admin");
const authRouter = require("./api/auth");

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/users", userRouter);
router.use("/trainers", trainerRouter);
router.use("/auth", authRouter);

module.exports = router;
