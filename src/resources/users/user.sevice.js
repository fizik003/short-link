const userRepo = require("./user.DB.repository");

const create = async (user) => {
  return await userRepo.create(user);
};

const getByLogin = async (user) => userRepo.getByLogin(user);

module.exports = { create, getByLogin };
