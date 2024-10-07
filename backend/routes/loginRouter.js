const express = require("express");
const loginRouter = express.Router();
const { login, getFunc } = require("../controllers/loginController");
// const {
//   getUserByCookie,
//   isAuthenticatedMiddleware,
// } = require("../auth/verifyUser");



loginRouter.post("/", login);


module.exports = loginRouter;
