const express = require("express");
const organizationRouter = express.Router();
const {createOrganization,getAllOrganizations,updateOrganization,deleteOrganization} = require("../controllers/organizationController");


organizationRouter.get("/", getAllOrganizations);
organizationRouter.post("/", createOrganization);
organizationRouter.put("/:id", updateOrganization);
organizationRouter.delete("/:id", deleteOrganization);


module.exports = organizationRouter;
