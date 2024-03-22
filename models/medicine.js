const mongoose = require("mongoose");
const schema = mongoose.Schema;

const medicineSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  howToUse: {
    type: String,
    required: true,
  },
  components: {
    type: String,
    required: true,
  },
  tradeMark: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Medicine", medicineSchema);
