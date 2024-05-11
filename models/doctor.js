const mongoose = require("mongoose");
const schema = mongoose.Schema;

const doctorSchema = new schema({
  username: {
    type: String,
    required: true,
    match: /^\S*$/,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  specialize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specializes",
  },
  hospitalID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  role: {
    type: String,
    default: "doctor",
  },
  code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
