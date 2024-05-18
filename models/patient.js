const mongoose = require("mongoose");
const schema = mongoose.Schema;

const patientSchema = new schema({
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
  address: {
    type: String,
    required: false,
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
  mobileNumber: {
    type: String,
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
  weight: {
    type: String,
    required: false,
  },
  bloodType: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: false,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
