const fiscalYearModel = require("../models/fiscalYearModel");
const userModel = require("../models/userModel");
const wasteModel = require("../models/wastesModel");

const transformData = (data, organizationId, fiscalId) => {
  return data.map((item) => {
    const value = Object.values(item)[0];

    const [start_date, end_date, type, quantity, category] =
      value.split(",");

    return {
      start_date: start_date.trim(),
      end_date: end_date.trim(),
      quantity: parseInt(quantity.trim(), 10),
      type: type.trim(),
      category: category.trim(),
      fyear: fiscalId,
      organization: organizationId,
    };
  });
};

const createWaste = async (req, res) => {
  const token = req.cookies.token;
  const user = await userModel.findOne({ token });
  const organization = user.organization;

  const { wtdata, SelectedOption } = req.body;
  const fyearvalue = SelectedOption.value;

  const existYear = await fiscalYearModel.findOne({ fiscalyear: fyearvalue });

  try {
    let fiscaldata = existYear;

    if (!existYear) {
      try {
        fiscaldata = new fiscalYearModel({ fiscalyear: fyearvalue, organization });
        await fiscaldata.save();
      } catch (err) {
        return res.status(404).send({ mess: "fiscal year not created", err });
      }
    }

    const transformeddata = transformData(wtdata, organization, fiscaldata._id);


    const newwaste = await wasteModel.insertMany(transformeddata);
    return res.status(201).send(newwaste);
  } catch (err) {
    return res.status(404).send(err);
  }
};
const updateWaste = async (req, res) => {
  const id = req.params.id;
  try {
    const updatewaste = await wasteModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    await updatewaste.save();
    return res.status(201).send(updatewaste);
  } catch (err) {
    return res.status(404).send(err);
  }
};
const deleteWaste = async (req, res) => {
  const id = req.params.id;
  try {
    const deletewaste = await wasteModel.deleteMany();
    return res.status(201).send(deletewaste);
  } catch (err) {
    return res.status(404).send(err);
  }
};
const getAllWastes = async (req, res) => {
  try {
    const getwastes = await wasteModel
      .find()
      .populate("fyear")
      .populate("organization");
    return res.status(201).send(getwastes);
  } catch (err) {
    return res.status(404).send(err);
  }
};

module.exports = { createWaste, getAllWastes, deleteWaste, updateWaste };
