const { Link } = require("./link.model");

const getByUserId = async (userId) => {
  const links = await Link.findAll({
    where: { UserId: userId },
  });
  return links;
};

const getByOriginLink = async (originLink) => {
  const link = await Link.findOne({ where: { originLink } });
  return link;
};

const create = async (userId, linkData) => {
  const newLink = await Link.create({ ...linkData, UserId: userId });
  return newLink;
};

const update = async (linkId, linkData) => {
  const updateLink = await Link.update({ description: linkData.description });
  return updateLink;
};

module.exports = { create, update, getByUserId, getByOriginLink };
