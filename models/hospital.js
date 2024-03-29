const mongoose = require("mongoose");
const schema = mongoose.Schema;

const hospitalSchema = new schema({
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
  address: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "hospital",
  },
});

module.exports = mongoose.model("Hospital", hospitalSchema);
