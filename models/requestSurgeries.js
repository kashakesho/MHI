const mongoose = require("mongoose");
const doctor = require("./doctor");
const patient = require("./patient");
const schema = mongoose.Schema;

const surgeriesSchema = new schema({
  date: {
    type: Date,
    default: Date.now,
  },

  description: {
    type: String,
    required: true,
  },
  specialize: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  status: {
    type: String,
    enum: ["Done", "Cancelled", "Waiting"],
    default: "Waiting",
  },
});

module.exports = mongoose.model("surgeries", surgeriesSchema);
