const { Link } = require("./link.model");

const getByUserId = async (userId) => {
  const links = await Link.findAll({
    where: { UserId: userId },
  });
  return links;
};

const getByLinkId = async (linkId) => {
  const link = await Link.findOne({ where: { id: linkId } });
  return link;
};

const getByUserOriginLink = async (userId, originLink) => {
  const link = await Link.findOne({ where: { originLink, UserId: userId } });
  return link;
};

const create = async (userId, linkData) => {
  const newLink = await Link.create({ ...linkData, UserId: userId });
  return newLink;
};

const update = async (linkId, linkData) => {
  const updateLink = await Link.update(linkData, {
    where: {
      id: linkId,
    },
  });
  return updateLink;
};

module.exports = {
  create,
  update,
  getByUserId,
  getByUserOriginLink,
  getByLinkId,
};
