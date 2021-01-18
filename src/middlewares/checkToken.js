const jwt = require("jsonwebtoken");
const config = require("config");
const { StatusCodes } = require("http-status-codes");

const checkToken = (req, res, next) => {
  const { headers } = req;
  const secret = config.get("secret");

  try {
    const token = headers.authorization.split(" ")[1];
    const authData = jwt.verify(token, secret);
    req.user = authData;
    next();
  } catch (err) {
    if (req.baseUrl === "/api/link") next();
    else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "нет авторизации" });
    }
  }
};

module.exports = { checkToken };
