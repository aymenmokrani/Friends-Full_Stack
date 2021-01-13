const { check } = require("express-validator");

module.exports.validRegister = [
  check("name", "Name must be between 4 and 12 characters")
    .notEmpty()
    .isLength({ min: 4, max: 12 }),
  check("email", "please enter a valid email ").notEmpty().isEmail(),
  check("password", "password must be between 4 and 16 caracters")
    .notEmpty()
    .isLength({ min: 4, max: 16 }),
  check("password", "pasword must contain a number").matches(/\d/),
];

module.exports.validLogin = [
  check("email", "please enter a valid email ").notEmpty().isEmail(),
  check("password", "password must be between 4 and 16 caracters")
    .notEmpty()
    .isLength({ min: 4, max: 16 }),
];
