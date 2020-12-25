const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");

const linkService = require("./link.service");

const route = Router();

route.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const links = await linkService.getByUserId(userId);
    if (Object.keys(links).length === 0) {
      return res.status(StatusCodes.OK).json({ message: "ссылок нет" });
    }
    // console.log(typeof links);
    res.status(StatusCodes.OK).json({ links });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "проблемы на сервере" });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const linkId = req.params.id;
    const userId = req.user.id;
    const link = await linkService.getByUserLinkId(userId, linkId);
    if (!link) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Ссылка не найдена" });
    }
    res.status(StatusCodes.OK).json(link);
  } catch {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "problem on server" });
  }
});

route.post("/create", async (req, res) => {
  const linkData = req.body;
  const userId = req.user.id;
  try {
    const checkLink = await linkService.getByUserOriginLink(
      userId,
      linkData.originLink
    );
    if (checkLink) {
      return res.status(StatusCodes.OK).json({ link: checkLink });
    }
    const link = await linkService.create(userId, linkData);
    res.status(StatusCodes.OK).json({ link });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "problem on server" });
  }
});

module.exports = { route };
