require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
// const config = require("config");
const cors = require("cors");

const app = express();

app.use(cors());

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

// Routes
// app.use("/api/register", require("./routes/api/users"));
// app.use("/api/auth/login", require("./routes/api/auth"));
// app.use("/api/auth/logout", require("./routes/api/auth"));
// app.use("/api/auth/profile", require("./routes/api/auth"));

app.use("/api", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
