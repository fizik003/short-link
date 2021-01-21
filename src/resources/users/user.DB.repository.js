const { User } = require("./user.model");

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email }, include: "links" });
  return user;
};

const create = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

const getById = async (userId) => {
  const user = await User.findByPk(userId, { include: "links" });
  return user;
};
module.exports = { getByEmail, create, getById };
