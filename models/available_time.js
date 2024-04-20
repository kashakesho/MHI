const mongoose = require("mongoose");
const schema = mongoose.Schema;

const av_timeSchema = new schema({
  day: {
    type: String,
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
});

module.exports = mongoose.model("Available_Time", av_timeSchema);
