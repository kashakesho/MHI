const mongoose = require("mongoose");
const schema = mongoose.Schema;

const hospitalSchema = new schema({
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
  code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Hospital", hospitalSchema);
