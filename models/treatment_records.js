const mongoose = require("mongoose");
const doctor = require("./doctor");
const patient = require("./patient");
const schema = mongoose.Schema;

const recordSchema = new schema({
  date: {
    type: Date,
    default: Date.now,
  },
  diagnose: [
    {
      medicine: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
});

module.exports = mongoose.model("Records", recordSchema);
