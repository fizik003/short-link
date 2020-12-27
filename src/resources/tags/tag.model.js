const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../DB/db");

const Tag = sequelize.define("Tag", {
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = { Tag };
