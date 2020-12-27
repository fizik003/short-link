const { DataTypes } = require("sequelize");

const { sequelize } = require("../../../DB/db");
const { Tag } = require("../tags/tag.model");

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
    defaultValue: 0,
  },
  code: {
    type: DataTypes.STRING,
  },
});

Tag.belongsToMany(Link, {
  through: "LinkTag",
});

Link.belongsToMany(Tag, {
  through: "LinkTag",
});

module.exports = { Link };
