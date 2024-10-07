const batchModel = require("../models/batchModel");
const userModel = require("../models/userModel");



const createBatch = async (req, res) => {
  try {

    const transformedData = transformData(req.body, userOrganizationId);

    const newBatch = await batchModel.insertMany(transformedData);

    return res.status(201).send(newBatch);
  } catch (err) {
    console.error("Error occurred:", err.message);
    return res.status(500).send({ error: err.message });
  }
};

const getAllBatches = async (req, res) => {
  try {
    const allbatches = await batchModel.find().populate("organization");
    return res.status(200).send(allbatches);
  } catch (err) {
    return res.status(404).send({ message: "NO datas found" });
  }
};
const deleteBatch = async (req, res) => {
  try {
    const deletbatch = await batchModel.deleteMany({});
    return res.status(200).send({ message: "Successfully deleted all datas" });
  } catch (err) {
    return res.status(404), send({ message: "No datas found" });
  }
};

module.exports = { createBatch, deleteBatch, getAllBatches };
