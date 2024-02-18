const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bookSchema = new schema({
  day: {
    type: Date,

    requred: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  hospitalID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
});

module.exports = mongoose.model("Booking", bookSchema);
