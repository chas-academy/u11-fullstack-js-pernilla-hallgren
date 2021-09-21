const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
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
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },

  // trainer: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "trainer",
  // },
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

module.exports = Review = mongoose.model("review", ReviewSchema);
