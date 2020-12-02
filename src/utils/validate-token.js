const jwt = require("jsonwebtoken");
const User = require("../models/User");

// middleware to validate token
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token && req.cookies.token.split(" ").pop();
  if (!token) return res.status(401).send({ error: "Unauthorized" });
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findOne({ _id: payload._id, token });
    if (!user) throw new Error("Invalid token");

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.message = "Session timed out,please login again";
    }
    if (error.name === "JsonWebTokenError") {
      error.message = "Invalid token";
    }
    res.status(401).send({ error });
  }
};

module.exports = verifyToken;
