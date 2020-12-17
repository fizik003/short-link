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

router.post("/create", async (req, res) => {
  try {
    const { name, login, password } = req.body;
    const condidate = await userService.getByLogin(login);
    if (condidate) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "такой логин уже есть" });
    }
    console.log(req.body);
    const user = await userService.create({ name, login, password });
    console.log("uuuuseeer", user);
    const { id } = user;
    res.status(StatusCodes.OK).json({ login, name, id });
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
    const token = await userService.tokenCreate(userData);
    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "пользователь не найден" });
    }
    res.status(StatusCodes.OK).json({ token });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "problem on server" });
  }
});

module.exports = { router };
