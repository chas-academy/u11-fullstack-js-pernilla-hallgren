require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const app = express();

app.use(express.json());

const db = process.env.DATABASE_URL;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
