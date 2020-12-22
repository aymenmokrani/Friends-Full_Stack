const Jwt = require("jsonwebtoken");
const User = require("../model/User");
const { SECRET_JWT } = require("../utils/Consts");

const isAuth = (req, res, next) => {
  const token = req.body.token;
  let isAuth = false;
  if (token) {
    Jwt.verify(token, SECRET_JWT, (error, decodedToken) => {
      if (error) {
        req.results = { isAuth, error: error.message };
        next();
      } else {
        isAuth = true;
        try {
          User.findById(decodedToken.id).then((data) => {
            req.results = { isAuth, user: data };
            next();
          });
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  } else {
    req.results = { isAuth, error: "token doesn't exist" };
    next();
  }
};

module.exports = isAuth;
