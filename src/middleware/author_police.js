const { to } = require("../helpers/to_promise");
const myJwt = require("../services/jwt_service");

module.exports = async function (req, res, next) {
  if (req.method == "OPTIONS") {
    next();
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res
        .status(404)
        .json({ message: "Author not found(no authorization)" });
    }
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer != "Bearer" || !token) {
      return res
        .status(404)
        .json({ message: "Author not found(token berilmagan)" });
    }
console.log(token);
    const [ error, decodedToken ] = await to(myJwt.verifyAccessToken(token));
    console.log(error);
    if (error) {
      return res.status(403).json({ message: error.message });
    }
    console.log("decodedToken", decodedToken);
    req.author = decodedToken;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ message: "Author not found(token noto'g'ri" });
  }
};
