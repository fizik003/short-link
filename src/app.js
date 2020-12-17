const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const { User } = require("./resources/users/user.model");
const { Link } = require("./resources/links/link.model");

const { sequelize } = require("../DB/db");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json({ extended: true }));
const PORT = config.get("port");
const { router: userRouter } = require("./resources/users/user.router");
const { route: linkRouter } = require("./resources/links/link.router");
const { checkToken } = require("./middlewares/checkToken");

app.use("/user", userRouter);
app.use(checkToken);
app.use("/link", linkRouter);

const f = async () => {
  await sequelize.sync({ force: true });
};

const start = async () => {
  try {
    // await sequelize.authenticate();
    // console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}`);

      f();
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

start();
