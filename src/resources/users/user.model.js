const { DataTypes } = require("sequelize");

const { sequelize } = require("../../../DB/db");

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  login: DataTypes.STRING,
  password: DataTypes.STRING,
});

module.exports = { User };
