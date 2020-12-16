const { DataTypes } = require("sequelize");

const { sequelize } = require("../../../DB/db");

const Link = sequelize.define("Link", {
  originLink: {
    type: DataTypes.STRING,
  },
  newLink: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  clicks: {
    type: DataTypes.NUMBER,
  },
  code: {
    type: DataTypes.STRING,
  },
});

module.exports = { Link };
