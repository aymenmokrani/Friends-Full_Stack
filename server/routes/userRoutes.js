const { Router } = require("express");
const {
  getAllUsers,
  getUser,
  addFriend,
  removeFriend,
} = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");

const userRouter = Router();

userRouter.get("/allusers", getAllUsers);
userRouter.post("/user", isAuth, getUser);
userRouter.post("/addfriend", isAuth, addFriend);
userRouter.post("/removeFriend", isAuth, removeFriend);

module.exports = userRouter;
