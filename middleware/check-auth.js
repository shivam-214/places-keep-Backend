const jwt = require("jsonwebtoken");

const httpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: "Bearer TOKEN"
    if (!token) {
      throw new Error("Authentication failed!", 401);
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new httpError("Authentication failed!", 403);
    return next(error);
  }
};
