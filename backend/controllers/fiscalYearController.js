const userModel = require("../models/userModel");
const yearModel = require("../models/fiscalYearModel");

const creatYears = async (req, res) => {
  const token = req.cookies.token;
  const user = await userModel.findOne({ token });
  const Userorganization = user.organization;

  try {
    const newyears = new yearModel({
      fiscalyear: req.body.yearval,
      organization: Userorganization,
    });
    await newyears.save();
    return res
      .status(200)
      .send({ message: "years created successfull", newyears });
  } catch (err) {
    return res.status(404).send(err);
  }
};
const getAllYears = async (req, res) => {
  try {
    const newyears = await yearModel.find().populate("organization");
    return res.status(200).send(newyears);
  } catch (err) {
    return res.status(200).send(err);
  }
};

const deleteYear = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteyear = await yearModel.findByIdAndDelete(id);
    return res.status(200).send(deleteyear);
  } catch (err) {
    return res.status(404).send(err);
  }
};
module.exports = { creatYears, getAllYears, deleteYear };
