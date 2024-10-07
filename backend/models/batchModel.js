const mongoose = require("mongoose");

const batchModel = new mongoose.Schema({
  start_date: {
    type: String
  },
  end_date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  emissions: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  scope: {
    type: String,
    enum: ["scope1", "scope2", "scope3"],
  },
  organization:
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"organization"
  }
});

module.exports = mongoose.model("batch", batchModel);
