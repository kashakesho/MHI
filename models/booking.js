const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bookSchema = new schema({
  day: {
    type: Date,
    requred: true,
  },
  time: {
    type: String,
    requred: true,
  },
  status: {
    type: String,
    enum: ["Done", "Cancelled", "Waiting"],
    default: "Waiting",
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

module.exports = mongoose.model("Booking", bookSchema);
