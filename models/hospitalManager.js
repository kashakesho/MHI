const mongoose = require("mongoose");
const schema = mongoose.Schema;

const hospitalManagerSchema = new schema({
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
    default: "hospitalManager",
  },
  code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("hospitalManager", hospitalManagerSchema);
