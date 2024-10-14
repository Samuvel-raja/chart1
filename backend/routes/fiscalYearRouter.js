const express = require("express");
const {
  creatYears,
  getAllYears,
  deleteYear,
} = require("../controllers/fiscalYearController");

const yearRouter = express.Router();

yearRouter.post("/", creatYears);
yearRouter.get("/", getAllYears);
yearRouter.delete("/:id", deleteYear);

module.exports = yearRouter;
