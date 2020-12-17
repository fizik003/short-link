const jwt = require("jsonwebtoken");
const config = require("config");

const userRepo = require("./user.DB.repository");

const JWT_SECRET = config.get("secret");

const create = async (user) => userRepo.create(user);

const tokenCreate = async (userData) => {
  const user = await userRepo.getByLogin(userData.login);
  if (!user || user.password !== userData.password) {
    return undefined;
  }

  const { id, login } = user;
  const token = jwt.sign({ id, login }, JWT_SECRET);

  return token;
};

const getByLogin = async (login) => userRepo.getByLogin(login);

const getById = async (userId) => userRepo.getById(userId);
module.exports = { create, tokenCreate, getByLogin, getById };
