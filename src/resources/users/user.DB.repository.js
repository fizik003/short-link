const { User } = require("./user.model");

const getByLogin = async (login) => {
  const user = await User.findOne({ where: { login } });
  return user;
};

const create = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

module.exports = { getByLogin, create };
