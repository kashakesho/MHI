const mongoose = require("mongoose");
const schema = mongoose.Schema;

const rateSchema = new schema({
  rate: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  doctorName: {
    type: String,
    ref: "Doctor",
  },
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
});

module.exports = mongoose.model("Rate", rateSchema);
