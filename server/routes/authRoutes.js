const { Router } = require("express");
const {
  login_post,
  signup_post,
  logout,
} = require("../controllers/authController");

const authRouter = Router();

authRouter.post("/login", login_post);
authRouter.post("/signup", signup_post);

module.exports = authRouter;
