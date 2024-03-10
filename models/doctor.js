const mongoose = require("mongoose");
const schema = mongoose.Schema;

const doctorSchema = new schema({
  username: {
    type: String,
    required: true,
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
    type: String,
    required: true,
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
});

module.exports = mongoose.model("Doctor", doctorSchema);
