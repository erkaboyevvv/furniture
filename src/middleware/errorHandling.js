const ApiError = require("../error/apiError");

module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof SyntaxError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).jsom({ message: "Unknown error: " + err.message });
};
