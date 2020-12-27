const linkRepo = require("../links/link.DB.repository");

const getByCode = async (code) => linkRepo.getByCode(code);

module.exports = {
  getByCode,
};
