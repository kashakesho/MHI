const mongoose = require("mongoose");
const schema = mongoose.Schema;

const patientSchema = new schema({
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
  address: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },

  role: {
    type: String,
    default: "patient",
  },
  code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
