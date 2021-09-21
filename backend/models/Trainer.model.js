const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const TrainerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    type: String,
  },
  description: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  // reviews: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Review",
  //   },
  // ],
  // skills: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Skill",
  //   },
  // ],
  register_date: {
    type: Date,
    default: Date.now,
  },
});

TrainerSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = Trainer = mongoose.model("Trainer", TrainerSchema);
