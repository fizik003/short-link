const config = require("config");
const shortId = require("shortid");

const linkRepo = require("./link.DB.repository");

const getByUserId = async (userId) => linkRepo.getByUserId(userId);

const create = async (userId, linkData) => {
  const code = shortId.generate();
  const baseUrl = config.get("baseUrl");
  const newLink = `${baseUrl}/${code}`;
  const link = await linkRepo.create(userId, { ...linkData, newLink, code });
  return link;
};

const getByLinkId = async (linkId) => linkRepo.getByLinkId(linkId);

const update = async (linkId, linkData) => linkRepo.update(linkId, linkData);

const getByUserOriginLink = async (userId, originLink) =>
  linkRepo.getByUserOriginLink(userId, originLink);

module.exports = {
  getByUserId,
  create,
  update,
  getByUserOriginLink,
  getByLinkId,
};
