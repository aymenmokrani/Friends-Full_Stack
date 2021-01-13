const User = require("../model/User");
const jwt = require("jsonwebtoken");

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  const token = req.body.token;
  const { id } = jwt.decode(token, process.env.JWT_SECRET);

  try {
    const user = await User.findById(id);
    res.json({ user });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.addFriend = (req, res, next) => {
  const token = req.body.token;
  const friend = req.body.friend;
  const { id } = jwt.decode(token, process.env.JWT_SECRET);

  User.findById(id)
    .then((response) => {
      friendExist = response.friends.includes(friend._id);

      if (friendExist || id === response._id) res.end();
      else {
        response
          .update({ $push: { friends: friend._id } })
          .then((resp) => res.send(resp));
      }
    })
    .catch((error) => res.status(400).send(error.message));
};

module.exports.removeFriend = (req, res, next) => {
  const token = req.body.token;
  const friend = req.body.friend;
  const { id } = jwt.decode(token, process.env.JWT_SECRET);

  User.findById(id)
    .then((response) => {
      response.update({ $pull: { friends: friend._id } }).then((resp) => {
        res.send(resp);
      });
    })
    .catch((error) => res.status(400).send(error.message));
};
