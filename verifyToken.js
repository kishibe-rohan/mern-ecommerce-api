const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Invalid token or token expired");

      req.user = user;
      next();
    });
  } else {
    return res.status(403).json("Authentication error");
  }
};

const verifyAndAuthorize = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Authorization error");
    }
  });
};

const verifyAndAuthorizeAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Admin Authorization error");
    }
  });
};

module.exports = {
  verifyToken,
  verifyAndAuthorize,
  verifyAndAuthorizeAdmin,
};
