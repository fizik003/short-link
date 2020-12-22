const { Sequelize } = require("sequelize");

const { sequelize } = require("../../../DB/db");
const { Link } = require("../links/link.model");

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
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

User.hasMany(Link, { as: "links" });

module.exports = { User };
