const userModel = require("../models/userModel");
const waterModel = require("../models/waterModel");
const yearModel = require("../models/yearsWaterModel");

const transformData = (data, fyear, id) => {
  return data.map((item) => {

    const [key, value] = Object.entries(item)[0];
    const [v_start_date, v_end_date, v_units, v_type, v_status] = value.split(",");


    return {
      start_date: v_start_date.trim(),
      end_date: v_end_date.trim(),
      units: parseInt(v_units.trim(), 10),
      type: v_type.trim(),
      status: v_status.trim(),
      fyear, 
      organization: id,
    };
  });
};

const createWater = async (req, res) => {
  const token = req.cookies.token;
  const user = await userModel.findOne({ token });
  const organization = user.organization;

  const fyear = await yearModel.findOne({ organization });
console.log(req.body);

  try {
    const transformeddata = transformData(req.body, fyear._id, organization);

    console.log(transformeddata);

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
