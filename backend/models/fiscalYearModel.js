const mongoose = require("mongoose");

const yearsSchema = new mongoose.Schema({
  fiscalyear: {
    type: String,
    required: true,
    unique: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    ref: "organization",
  },
});

module.exports = mongoose.model("year", yearsSchema);
