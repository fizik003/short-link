const { Sequelize } = require("sequelize");
const config = require("config");

const { host, user, password, db, dialect, pool } = config.get("dbConfig");

const sequelize = new Sequelize(db, user, password, {
  host,
  dialect,
  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
});

module.exports = { sequelize };
