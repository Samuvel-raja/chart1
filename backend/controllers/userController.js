const { default: mongoose } = require("mongoose");
const userSchema = require("../models/userModel");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const createUser = async (req, res) => {
  const { username, email, password, organization, role } = req.body;

  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const newuser = new userSchema({
      username,
      email,
      password,
      organization,
      role,
    });

    await newuser.save();
    return res.status(201).send({
      message: "success",
      user: newuser,
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const getallUsers = await userSchema.find().populate("organization");
    return res.status(200).send(getallUsers);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateuser = await userSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    await updateuser.save();
    return res.status(200).send({ message: "update success", updateuser });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteuser = await userSchema.findByIdAndDelete(id);

    return res.status(200).send({ message: "delete success", deleteuser });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const findUser = async (req, res) => {
  const token = req.cookies.token;

  try {
    const user = await userModel.findOne({ token }).populate("organization");

    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports = { createUser, updateUser, getAllUsers, deleteUser, findUser };
