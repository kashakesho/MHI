const mongoose = require("mongoose");
const schema = mongoose.Schema;

const appointSurgerySchema = new schema({
  day: {
    type: Date,
    requred: true,
  },
  time: {
    type: String,
    requred: true,
  },
  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    requred: true,
  },
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    requred: true,
  },
});

module.exports = mongoose.model("appointSurgery", appointSurgerySchema);
