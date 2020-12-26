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
    const link = await linkService.getByLinkId(linkId);
    if (!link) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Ссылка не найдена" });
    }

    let author = false;
    if (req.user && req.user.id === link.UserId) author = true;
    res.status(StatusCodes.OK).json({ ...link.dataValues, author });
  } catch (error) {
    console.log(error);
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

route.put("/update", async (req, res) => {
  try {
    const { linkId, ...linkData } = req.body;
    const link = await linkService.update(linkId, linkData);
    if (!link) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "не обновленно, попробуйте еще раз",
      });
    }
    res.status(StatusCodes.OK).json(link[1][0].dataValues);
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "problem on server" });
  }
});

module.exports = { route };
