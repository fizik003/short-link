const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { checkToken } = require("../../middlewares/checkToken");

const linkService = require("./link.service");

const router = Router();

router.get("/", checkToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const links = await linkService.getByUserId(userId);
    if (Object.keys(links).length === 0) {
      return res.status(StatusCodes.OK).json({ message: "ссылок нет" });
    }
    res.status(StatusCodes.OK).json(links);
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "проблемы на сервере" });
  }
});

router.get("/:id", async (req, res) => {
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

router.post("/create", checkToken, async (req, res) => {
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

router.put("/update", checkToken, async (req, res) => {
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

router.delete("/delete/:id", checkToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const linkId = req.params.id;
    const link = await linkService.destroy(userId, linkId);
    if (!link) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Такая ссылка не найдена" });
    }

    res.status(StatusCodes.NO_CONTENT).json(link);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "problem on server" });
  }
});

module.exports = { router };
