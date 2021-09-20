const express = require("express");
const userRouter = require("./api/users");
const adminRouter = require("./api/admin");
const authRouter = require("./api/auth");

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

module.exports = router;
