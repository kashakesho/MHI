const mongoose = require("mongoose");
const schema = mongoose.Schema;

const hospitalAdminSchema = new schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  hospitalID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  role: {
    type: String,
    default: "HospitalAdmin",
  },
});

module.exports = mongoose.model("HospitalAdmin", hospitalAdminSchema);
