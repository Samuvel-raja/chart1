const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const njwt = require("njwt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Incorrect password" });
    }

    const claims = {
      sub: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = njwt.create(claims, process.env.SECRET_KEY);
    res.cookie("token", token.compact(),{
      httpOnly: true,   
      secure: process.env.NODE_ENV === 'production',  
      sameSite: 'Lax',  
      maxAge: 24 * 60 * 60 * 1000, 
    });
    
    const updateUserWithToken = await userModel.findByIdAndUpdate(
      user._id,
      { token: token.compact() },
      { new: true }
    );
    updateUserWithToken.save();

    return res.status(200).send(user);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};


module.exports = { login};
