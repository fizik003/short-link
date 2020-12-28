const tagRepo = require("./tag.DB.repository");

const getByTag = async (tag) => tagRepo.getByTag(tag);

module.exports = { getByTag };
