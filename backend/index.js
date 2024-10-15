const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");
const organizationRouter = require("./routes/organizationRoutes");
const emissionRouter = require("./routes/emissionRoutes");
const userRouter = require("./routes/userRouter");
const loginRouter = require("./routes/loginRouter");
const homeRouter = require("./routes/HomeRouter");
const waterRouter = require("./routes/waterRouter");
const yearRouter = require("./routes/fiscalYearRouter");
const wastesRouter = require("./routes/wastesRouter");

require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(cookie());

app.use("/organization", organizationRouter);
app.use("/emission", emissionRouter);
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);
app.use("/water", waterRouter);
app.use("/year", yearRouter);
app.use("/wastes", wastesRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.listen(8080);
