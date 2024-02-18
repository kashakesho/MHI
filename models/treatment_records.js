const mongoose = require("mongoose");
const schema = mongoose.Schema;

const recordSchema = new schema({
  date: {
    timeStamp: true,
  },

  medicine: {
    type: String,
    required: true,
  },
  diagnose: {
    type: String,
    required: true,
  },
  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },

  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
});

module.exports = mongoose.model("Records", recordSchema);
