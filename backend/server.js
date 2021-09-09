const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const app = express();

app.use(express.json());

// Run our server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
