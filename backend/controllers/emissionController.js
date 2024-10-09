const { default: mongoose } = require("mongoose");
const emissionModel = require("../models/emissionModel");
const userModel = require("../models/userModel");
const yearModel = require("../models/fiscalYearModel");
const transformData = (data, fid, id) => {
  return data.map((item) => {
    const [start_date, end_date,fyear, description, emissions, type, scope] =
      item["start_date,end_date,fyear,description,emissions,type,scope"].split(
        ","
      );

    let modifiedScope = scope.trim();

    return {
      start_date,
      end_date,
      fyear: fid,
      description,
      emissions:Number(emissions),
      type,
      scope: modifiedScope,
      organization: id,
    };
  });
};

const createEmission = async (req, res) => {
  const { data, SelectedOption } = req.body;

  try {
    const token = req.cookies.token;

    const userData = await userModel.findOne({ token });

    const userOrganizationId = userData.organization;
    const fyear = SelectedOption.value;

    let fyeardata;
    try {
      fyeardata = new yearModel({ fiscalyear: fyear, userOrganizationId });
      await fyeardata.save();
    } catch (err) {
      return res.status(404).send(err);
    }
 

    const transformedData = await transformData(
      data,
      fyeardata._id,
      userOrganizationId
    );
    
    const newEmission = await emissionModel.insertMany(transformedData);

    return res
      .status(200)
      .send({ message: "Emission created successfully", newEmission });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const deleteAllEmission = async (req, res) => {
  try {
    const deleteallemission = await emissionModel.deleteMany();
    return res
      .status(200)
      .send({ message: "Successfully deleted all emissions" });
  } catch (err) {
    return res.status(404).send({ message: "NO datas found" });
  }
};
const getAllEmissions = async (req, res) => {
  try {
    const allemissions = await emissionModel.find().populate("organization").populate("fyear");
    return res.status(200).send(allemissions);
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

const updateEmission = async (req, res) => {
  try {
    const emission = await emissionModel
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("organization");

    if (!emission) {
      return res.status(404).send({ message: "Emission not found" });
    }

    return res.status(200).send(emission);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteEmission = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteemission = await emissionModel.findByIdAndDelete(id);
    return res.status(200).send({ message: "Delete success", deleteemission });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

module.exports = {
  createEmission,
  getAllEmissions,
  updateEmission,
  deleteEmission,
  deleteAllEmission,
};
