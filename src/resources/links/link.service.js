const config = require("config");
const shortId = require("shortid");

const linkRepo = require("./link.DB.repository");

const getByUserId = (userId) => linkRepo.getByUserId(userId);

const create = async (userId, linkData) => {
  const code = shortId.generate();
  const baseUrl = config.get("baseUrl");
  const newLink = `${baseUrl}/go/${code}`;
  const link = await linkRepo.create(userId, { ...linkData, newLink, code });
  return link;
};

const getByLinkId = (linkId) => linkRepo.getByLinkId(linkId);

const update = (linkId, linkData) => linkRepo.update(linkId, linkData);
const destroy = (userId, linkId) => linkRepo.destroy(userId, linkId);

const getByUserOriginLink = (userId, originLink) =>
  linkRepo.getByUserOriginLink(userId, originLink);

const getStatsByUser = (userId) => linkRepo.getStatsByUser(userId);

module.exports = {
  getByUserId,
  create,
  update,
  getByUserOriginLink,
  getByLinkId,
  destroy,
  getStatsByUser,
};
