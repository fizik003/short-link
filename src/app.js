const express = require("express");
const config = require("config");

const app = express();

const PORT = config.get("port");

app.use(express.json({ extended: true }));

app.use("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

app.listen(PORT, () => {
  console.log(`App has been started on port ${PORT}`);
});
