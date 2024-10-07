const organizationModel = require("../models/organizationModel");

const createOrganization = async (req, res) => {
  try {
    const newOrganization = new organizationModel(req.body);
    await newOrganization.save();
    return res
      .status(201)
      .send({ message: "organization created successfully" });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
const getAllOrganizations= async (req, res) => {
  try {
    const allOrganizations = await organizationModel.find();
   
    return res
      .status(201)
      .send(allOrganizations);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
const updateOrganization= async (req, res) => {
  const id=req.params.id;
  try {
    const updateorganization = await organizationModel.findByIdAndUpdate(id,req.body,{new:true});
    updateorganization.save();
    return res
      .status(201)
      .send(updateorganization);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
const deleteOrganization= async (req, res) => {
  const id=req.params.id;

  try {
    const deleteorganization = await organizationModel.findByIdAndDelete(id);
  
    return res
      .status(201)
      .send(deleteorganization);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
module.exports={createOrganization,getAllOrganizations,updateOrganization,deleteOrganization};