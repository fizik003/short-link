const { User } = require("./user.model");
const { Link } = require("../links/link.model");
const { Tag } = require("../tags/tag.model");

const getByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
    include: [{ model: Link, as: "links", include: Tag }],
  });
  return user;
};

const create = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

const getById = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [{ model: Link, as: "links", include: Tag }],
  });
  return user;
};
module.exports = { getByEmail, create, getById };
