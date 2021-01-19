const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");

const userService = require("./user.sevice");

const router = Router();
const { checkToken } = require("../../middlewares/checkToken");

router.get("/", checkToken, async (req, res) => {
  try {
    const user = await userService.getById(req.user.id);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "user not found" });
    }

    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "problem on server" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const condidate = await userService.getByEmail(email);
    if (condidate) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "такой пользователь уже есть" });
    }
    const user = await userService.create({ name, email, password });
    const { id } = user;
    res.status(StatusCodes.OK).json({ email, name, id });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "problem on server" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = req.body;
    const currentUser = await userService.tokenCreate(userData);
    if (!currentUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "пользователь не найден" });
    }
    res.status(StatusCodes.OK).json(currentUser);
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "problem on server" });
  }
});

module.exports = { router };
