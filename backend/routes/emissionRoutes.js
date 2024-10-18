const express = require("express");
const emissionRouter = express.Router();
const {createEmission,getAllEmissions,updateEmission,deleteEmission, deleteAllEmission, getSingleEmission} = require("../controllers/emissionController");

emissionRouter.post("/", createEmission);
emissionRouter.get("/", getAllEmissions);
emissionRouter.get("/:id", getSingleEmission);
emissionRouter.put("/:id", updateEmission);
emissionRouter.delete("/:id", deleteEmission);
emissionRouter.delete("/", deleteAllEmission);

module.exports = emissionRouter;
