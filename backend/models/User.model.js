const mongoose = require("mongoose");
const Review = require("./Review.model");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  register_date: {
    type: Date,
    default: Date.now,
  },
});
// Will delete the _id which is automatically generated
UserSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

UserSchema.pre("remove", function (next) {
  Review.remove({ user: this.id }).exec();

  return next();
});

module.exports = User = mongoose.model("User", UserSchema);
