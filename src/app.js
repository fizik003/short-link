const express = require("express");
const config = require("config");

const { sequelize } = require("../DB/db");

const app = express();

const PORT = config.get("port");

app.use(express.json({ extended: true }));

app.use("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};
start();
