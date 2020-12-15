const { Sequelize } = require("sequelize");

const { sequelize } = require("../../../DB/db");

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  },
  name: {
    type: Sequelize.STRING,
  },
  login: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = { User };
