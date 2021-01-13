const User = require("../model/User");
const Jwt = require("jsonwebtoken");

const createToken = (id) => {
  const token = Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.MAX_AGE,
  });
  return token;
};

module.exports.signup_post = async (req, res) => {
  // Register a new user to the database
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.send({ user });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ msg: "This email already exists", error });
    } else res.status(400).json({ error });
  }
};

module.exports.login_post = async (req, res) => {
  //Verify a user if exists
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.send({ token, user });
  } catch (err) {
    const error = err.message;
    res.status(400).send({ error });
  }
};
