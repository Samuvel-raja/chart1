const { default: mongoose } = require("mongoose");
const userSchema = require("../models/userModel");
const bcrypt=require('bcrypt');

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

    // const claims = {
    //   sub: newuser._id,
    //   username: newuser.username,
    //   role: newuser.role,
    // };
    // if (req.body.password === confirmpassword) {
    //   const token = njwt.create(claims, process.env.SECRET_KEY);
    //   res.cookie("token", token.compact());
    // } else {
    //   return res.send({ message: "Passwords do not match" });
    // }

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

module.exports = { createUser, updateUser, getAllUsers, deleteUser };
