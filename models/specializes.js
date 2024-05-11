const mongoose = require("mongoose");
const schema = mongoose.Schema;

const patientSchema = new schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Specializes", patientSchema);
