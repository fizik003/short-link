const jwt = require("jsonwebtoken");
const config = require("config");

const userRepo = require("./user.DB.repository");

const JWT_SECRET = config.get("secret");

const create = async (user) => userRepo.create(user);

const tokenCreate = async (userData) => {
  const user = await userRepo.getByEmail(userData.email);
  if (!user || user.password !== userData.password) {
    return undefined;
  }

  const { id, email } = user;
  const token = jwt.sign({ id, email }, JWT_SECRET);
  const resp = { id, email, token: `Bearer ${token}` };

  return resp;
};

const getByEmail = async (email) => userRepo.getByEmail(email);

const getById = async (userId) => userRepo.getById(userId);
module.exports = { create, tokenCreate, getByEmail, getById };
