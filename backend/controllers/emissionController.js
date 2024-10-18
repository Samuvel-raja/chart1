const { default: mongoose } = require("mongoose");
const emissionModel = require("../models/emissionModel");
const userModel = require("../models/userModel");
const fiscalYearModel = require("../models/fiscalYearModel");
const transformCSVData = (data, fid, id) => {
  return data.map((item) => {
    const [start_date, end_date, description, emissions, type, scope] =
      item["start_date,end_date,description,emissions,type,scope"].split(",");

    let modifiedScope = scope.trim();

    return {
      start_date,
      end_date,
      fyear: fid,
      description,
      emissions: Number(emissions),
      type,
      scope: modifiedScope,
      organization: id,
    };
  });
};

const transformExcellData = (data, fid, id) => {
  // console.log(data);

  return data.map((item) => {
    return {
      start_date: item.start_date,
      end_date: item.end_date,
      fyear: fid,
      description: item.description,
      emissions: Number(item.emissions),
      type: item.type,
      scope: item.scope,
      organization: id,
    };
  });
};

const createEmission = async (req, res) => {
  const { data, SelectedOption, typeofdata } = req.body;

  // console.log(data);

  try {
    const token = req.cookies.token;

    const userData = await userModel.findOne({ token });

    const userOrganizationId = userData.organization;
    const fyearvalue = SelectedOption.value;

    // console.log(data);

    const existYear = await fiscalYearModel.findOne({ fiscalyear: fyearvalue });

    // console.log(existYear);

    let fiscaldata = existYear;

    if (!existYear) {
      try {
        fiscaldata = new yearModel({
          fiscalyear: fyearvalue,
          organization: userOrganizationId,
        });
        await fiscaldata.save();
      } catch (err) {
        return res.status(404).send({ mess: "fiscal year not created", err });
      }
    }

    let newEmission;

    if (typeofdata == "csv") {
      const transformedData = await transformCSVData(
        data,
        fiscaldata._id,
        userOrganizationId
      );
      // console.log(transformedData);

      newEmission = await emissionModel.insertMany(transformedData);
    }
    if (typeofdata == "excell") {
      const transformedExcelldata = transformExcellData(
        data,
        fiscaldata._id,
        userOrganizationId
      );
      // console.log(transformedExcelldata);

      newEmission = await emissionModel.insertMany(transformedExcelldata);
    }

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
    const allemissions = await emissionModel
      .find()
      .populate("fyear")
      .populate("organization");
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

const getSingleEmission = async (req, res) => {
  const id = req.params.id;
  
  try {
    const singledata = await emissionModel.findOne({_id:id})
    return res.status(200).send(singledata);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports = {
  createEmission,
  getAllEmissions,
  updateEmission,
  deleteEmission,
  deleteAllEmission,
  getSingleEmission,
};
