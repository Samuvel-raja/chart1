const userModel = require("../models/userModel");
const waterModel = require("../models/waterModel");
const yearModel = require("../models/fiscalYearModel");
const fiscalYearModel = require("../models/fiscalYearModel");
const organizationModel = require("../models/organizationModel");

const transformData = (data, organizationId, fiscalId) => {
  // console.log(data);

  return data.map((item) => {
    const value = Object.values(item)[0];

    const [start_date, end_date, units, type, status] = value.split(",");

    return {
      start_date: start_date.trim(),
      end_date: end_date.trim(),
      units: parseInt(units.trim(), 10),
      type: type.trim(),
      status: status.trim(),
      fyear: fiscalId,
      organization: organizationId,
    };
  });
};
const transformExcellData = (data, organizationId, fiscalId) => {
  // console.log(data);

  return data.map((item) => {
    return {
      start_date: item.start_date,
      end_date: item.end_date,
      fyear: fiscalId,
      units: item.units,
      type: item.type,
      status: item.status,
      organization: organizationId,
    };
  });
};
const createWater = async (req, res) => {
  const token = req.cookies.token;
  const user = await userModel.findOne({ token });
  const organization = user.organization;

  const { wdata, typeofdata, SelectedOption } = req.body;

  const fyearvalue = SelectedOption.value;

  const existYear = await yearModel.findOne({ fiscalyear: fyearvalue });

  try {
    let fiscaldata = existYear;

    if (!existYear) {
      try {
        fiscaldata = new yearModel({ fiscalyear: fyearvalue, organization });
        await fiscaldata.save();
      } catch (err) {
        return res.status(404).send({ mess: "fiscal year not created", err });
      }
    }
    let newwater;
    if (typeofdata == "csv") {
      const transformeddata = transformData(
        wdata,
        organization,
        fiscaldata._id
      );

      newwater = await waterModel.insertMany(transformeddata);
    }
    if (typeofdata == "excell") {
      const transformedExcelldata = transformExcellData(
        wdata,
        organization,
        fiscaldata._id
      );
      // console.log(transformedExcelldata);

      newwater = await waterModel.insertMany(transformedExcelldata);
    }
    return res
      .status(200)
      .send({ message: "Water successfully created", newwater });
  } catch (err) {
    return res.status(404).send({ err });
  }
};

const updateWater = async (req, res) => {
  const id = req.params.id;
  const { fyear, organization } = req.body;
  const fyearvalues = await fiscalYearModel.findOne({ fiscalyear:fyear.fiscalyear});
  if (!fyearvalues) {
    return res.status(400).send({ mess: "No data found" });
  }
  const fyeardata = await fiscalYearModel.findByIdAndUpdate(
    fyearvalues._id,
    { fiscalyear: fyearvalues.fiscalyear },
    {
      new: true,
    }
  );
  const organizationdata = await organizationModel.findByIdAndUpdate(
    organization._id,
    organization,
    { new: true }
  );
  req.body.fyear = fyeardata._id;
  req.body.organization = organizationdata._id;
  try {
    const updatewater = await waterModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .send({ message: "Water successfully updated", updatewater });
  } catch (err) {
    return res.status(404).send({ err });
  }
};

const deleteWater = async (req, res) => {
  const id = req.params.id;

  try {
    const deletewater = await waterModel.findByIdAndDelete(id);
    return res
      .status(200)
      .send({ message: "Water successfully deleted", deletewater });
  } catch (err) {
    return res.status(404).send({ err });
  }
};

const getAllWaters = async (req, res) => {
  try {
    const getallWaters = await waterModel
      .find()
      .populate("organization")
      .populate("fyear");
    return res
      .status(200)
      .send({ message: "Water successfully received", getallWaters });
  } catch (err) {
    return res.status(404).send({ err });
  }
};

const deleteAllWaters = async (req, res) => {
  try {
    const deleteddata = await waterModel.deleteMany();
    return res.status(200).send(deleteddata);
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

const getSingleWater = async (req, res) => {
  const id = req.params.id;
  try {
    const singlewater = await waterModel
      .findOne({ _id: id })
      .populate("fyear")
      .populate("organization");
    return res.status(200).send(singlewater);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports = {
  createWater,
  updateWater,
  deleteWater,
  getAllWaters,
  deleteAllWaters,
  getSingleWater,
};
