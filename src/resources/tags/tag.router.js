const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");

const tagService = require("./tag.service");

const router = Router();

router.get("/:tag", async (req, res) => {
  try {
    const { tag } = req.params;
    const tagFromDb = await tagService.getByTag(tag);
    if (!tagFromDb) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Тэг не найден" });
    }

    res.status(StatusCodes.OK).json(tagFromDb);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "problem on server" });
  }
});

module.exports = { router };
