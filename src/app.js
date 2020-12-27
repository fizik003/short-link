const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");

const { sequelize } = require("../DB/db");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json({ extended: true }));
const PORT = config.get("port");
const { router: userRouter } = require("./resources/users/user.router");
const { route: linkRouter } = require("./resources/links/link.router");
const { checkToken } = require("./middlewares/checkToken");
const {
  route: redirectRouter,
} = require("./resources/redirect/redirect.router");
app.use("/go", redirectRouter);
app.use("/api/user", userRouter);
app.use(checkToken);
app.use("/api/link", linkRouter);

const syncDb = async () => {
  // await sequelize.sync({ force: true });
  await sequelize.sync();
};

const start = async () => {
  try {
    // await sequelize.authenticate();
    // console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}`);

      syncDb();
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

start();
