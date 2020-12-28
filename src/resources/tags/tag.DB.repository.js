const { Tag } = require("./tag.model");
const { Link } = require("../links/link.model");

const getByTag = async (tag) => {
  const tagFromDb = await Tag.findOne({
    where: { name: tag },
    include: [{ model: Link }],
  });

  return tagFromDb;
};

module.exports = { getByTag };
