const userModel = require("../models/userModel");
const waterModel = require("../models/waterModel");
const yearModel = require("../models/fiscalYearModel");

const transformData = (data, organizationId, fiscalId) => {
  return data.map((item) => {
    const value = Object.values(item)[0];

    const [start_date, end_date, fyear, units, type, status] = value.split(",");

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

const createWater = async (req, res) => {
  const token = req.cookies.token;
  const user = await userModel.findOne({ token });
  const organization = user.organization;

  const { wdata, SelectedOption } = req.body;
  const fyearvalue = SelectedOption.value;

  try {
    let fiscaldata;
    try {
       fiscaldata = new yearModel({ fiscalyear:fyearvalue, organization });
      await fiscaldata.save();
      
    } catch (err) {
      return res.status(404).send({mess:"fiscal year not created",err});
    }

    const transformeddata = transformData(wdata, organization, fiscaldata._id);

    const newwater = await waterModel.insertMany(transformeddata);
    return res
      .status(200)
      .send({ message: "water successfully created", newwater });
  } catch (err) {
    return res.status(404).send({ err });
  }
};
const updateWater = async (req, res) => {
  const id = req.params.id;

  try {
    const updatewater = await waterModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    await updatewater.save();
    return res
      .status(200)
      .send({ message: "water successfully updated", updatewater });
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
      .send({ message: "water successfully delted", deletewater });
  } catch (err) {
    return res.status(404).send({ err });
  }
};
const getAllWaters = async (req, res) => {
  try {
    const getallWaters = await waterModel
      .find()
      .populate("fyear")
      .populate("organization");
    return res
      .status(200)
      .send({ message: "water successfully received", getallWaters });
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
module.exports = {
  createWater,
  updateWater,
  deleteWater,
  getAllWaters,
  deleteAllWaters,
};
