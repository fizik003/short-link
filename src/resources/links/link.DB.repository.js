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

const getByCode = async (code) => {
  const link = await Link.findOne({ where: { code } });
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
    returning: true,
  });

  return updateLink;
};

const destroy = async (userId, linkId) => {
  const link = await Link.destroy({
    where: {
      UserId: userId,
      id: linkId,
    },
  });

  return link;
};

module.exports = {
  create,
  update,
  getByUserId,
  getByUserOriginLink,
  getByLinkId,
  destroy,
  getByCode,
};
