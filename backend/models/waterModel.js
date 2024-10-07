const express = require("express");
const mongoose = require("mongoose");

const waterModel = new mongoose.Schema({
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  fyear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "year",
  },
  units: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["withdrawn", "discharged", "consumed", "recycled"],
    required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organization",
  },
});
module.exports = mongoose.model("water", waterModel);
