const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const path = require("path");

const { sequelize } = require("../DB/db");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = config.get("port");
const { router: userRouter } = require("./resources/users/user.router");
const { router: linkRouter } = require("./resources/links/link.router");
const {
  route: redirectRouter,
} = require("./resources/redirect/redirect.router");
const { router: tagRouter } = require("./resources/tags/tag.router");

app.use("/go", redirectRouter);
app.use("/api/user", userRouter);
app.use("/api/tag", tagRouter);
app.use("/api/link", linkRouter);

const syncDb = async () => {
  // await sequelize.sync({ force: true });
  await sequelize.sync();
  console.log("db sync");
};

const start = () => {
  try {
    app.listen(PORT, async () => {
      console.log(`App has been started on port ${PORT}`);
      await syncDb();
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

start();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/dist/frontend"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        "..",
        "frontend",
        "dist",
        "frontend",
        "index.html"
      )
    );
  });
}
