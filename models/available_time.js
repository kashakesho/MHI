const mongoose = require("mongoose");
const schema = mongoose.Schema;

const av_timeSchema = new schema({
  day: {
    type: String,
    require: true,
  },
  date: {
    timeStamp: true,
  },
  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  hospitalID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
});

module.exports = mongoose.model("Available_Time", av_timeSchema);
