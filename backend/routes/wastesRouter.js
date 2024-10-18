const express = require("express");
const {
  createWaste,
  getAllWastes,
  updateWaste,
  deleteAllWastes,
  deleteWaste,
  getSingleWaste,
} = require("../controllers/wastesController");
const wastesRouter = express.Router();

wastesRouter.get("/", getAllWastes);
wastesRouter.post("/", createWaste);
wastesRouter.put("/:id", updateWaste);
wastesRouter.delete("/", deleteAllWastes);
wastesRouter.delete("/:id", deleteWaste);
wastesRouter.get("/:id", getSingleWaste);

module.exports = wastesRouter;
