const njwt = require("njwt");
const userModel = require("../models/userModel");

const getToken = (req) => {
  if (!req.cookies.token) return res.status(404).send(null);
  return req.cookies.token;
};

const throwNotAuthenticatedError = (res) => {
  return res.status(401).send({ error: { message: "User not authenticated" } });
};
const decodeToken = (token) => {
  try {
    const dToken = njwt.verify(token, process.env.SECRET_KEY);
    return dToken;
  } catch (error) {
    return null;
  }
};
const verifyUserWithToken = async (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return throwNotAuthenticatedError(res);
  }

  const decodedToken = decodeToken(token);

  if (!decodeToken) {
    return throwNotAuthenticatedError(res);
  }
  const tokenInDb = await userModel.findOne({token});

  if (!tokenInDb) return throwNotAuthenticatedError(res);

  req.user = decodedToken;
  next();
};

module.exports = verifyUserWithToken;
