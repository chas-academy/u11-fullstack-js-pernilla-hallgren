const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  text: {
    type: String,
    required: [true, "Review cannot be empty"],
  },
  rating: {
    type: Number,
    min: [1, "Rating cannot be below 1.0"],
    max: [5, "Rating cannot be above 5.0"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReviewSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = Review = mongoose.model("Review", ReviewSchema);
