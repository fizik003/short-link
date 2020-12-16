const { DataTypes } = require("sequelize");

const { sequelize } = require("../../../DB/db");
const { User } = require("../users/user.model");

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
    type: DataTypes.INTEGER,
  },
  code: {
    type: DataTypes.STRING,
  },
});

module.exports = { Link };
