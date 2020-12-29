const { Link } = require("./link.model");
const { Tag } = require("../tags/tag.model");
const strToArray = require("../../utils/strToArray");

const getByUserId = async (userId) => {
  const links = await Link.findAll({
    where: { UserId: userId },
  });
  return links;
};

const getByLinkId = async (linkId) => {
  const link = await Link.findOne({
    where: { id: linkId },
    include: [{ model: Tag }],
  });
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
  const { tags, ...link } = linkData;
  const newLink = await Link.create({ ...link, UserId: userId });

  if (tags && newLink) {
    const arrTags = await strToArray(tags);

    await Promise.all(
      arrTags.map(async (tag) => {
        const [tagIns] = await Tag.findOrCreate({ where: { name: tag } });
        await newLink.addTag(tagIns);
      })
    );
  }
  return newLink;
};

const update = async (linkId, data) => {
  const { tags, ...linkData } = data;

  const updateLink = await Link.update(linkData, {
    where: {
      id: linkId,
    },
    returning: true,
  });
  let arrTagInstance = [];

  if (tags && updateLink) {
    const arrTags = await strToArray(tags);
    arrTagInstance = await Promise.all(
      arrTags.map(async (tag) => {
        const [tagInstance] = await Tag.findOrCreate({ where: { name: tag } });
        return tagInstance;
      })
    );

    await updateLink[1][0].setTags(arrTagInstance);
  }

  // console.log(arrTagInstance);

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

const getStatsByUser = async (userId) => {
  const countLink = await Link.count({ where: { UserId: userId } });
};

module.exports = {
  create,
  update,
  getByUserId,
  getByUserOriginLink,
  getByLinkId,
  destroy,
  getByCode,
  getStatsByUser,
};
