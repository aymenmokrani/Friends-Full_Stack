const { Router } = require("express");
const {
  getAllUsers,
  getUser,
  addFriend,
  removeFriend,
} = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/allusers", getAllUsers);
userRouter.post("/user", getUser);
userRouter.post("/addfriend", addFriend);
userRouter.post("/removeFriend", removeFriend);

module.exports = userRouter;
