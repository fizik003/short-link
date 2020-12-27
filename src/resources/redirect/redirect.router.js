const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");

const redirectService = require("./redirect.service");

const route = Router();

route.get("/:code", async (req, res) => {
  try {
    const link = await redirectService.getByCode(req.params.code);
    if (!link) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Ссылка не найдена",
      });
    }
    link.clicks += 1;
    link.save();
    return res.redirect(link.originLink);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "проблемы на сервере" });
  }
});

module.exports = { route };
