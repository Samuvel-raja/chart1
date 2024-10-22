const mongoose = require("mongoose");

const yearsSchema = new mongoose.Schema({
  fiscalyear: {
    type: String,
    required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organization",
  },
});

module.exports = mongoose.model("year", yearsSchema);
