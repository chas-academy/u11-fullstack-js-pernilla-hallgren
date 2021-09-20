const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  name: String,
});
// will delete the _id which is automatically generated
SkillSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = Skill = mongoose.model("Skill", SkillSchema);
