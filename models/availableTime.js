const mongoose = require("mongoose");
const schema = mongoose.Schema;

const av_timeSchema = new schema({
  day: {
    type: Date,
    require: true,
  },
  time: {
    type: [String],
    require: true,
  },
  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  status: {
    type: String,
    enum: ["available", "not available"],
    default: "available",
  },
});

module.exports = mongoose.model("Available_Time", av_timeSchema);
