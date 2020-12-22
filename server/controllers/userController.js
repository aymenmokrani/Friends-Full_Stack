const User = require("../model/User");

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

module.exports.getUser = (req, res, next) => {
  const results = req.results;
  if (results.isAuth) {
    res.send(results);
  } else {
    res.status(400).json(results);
  }
};

module.exports.addFriend = (req, res, next) => {
  if (req.results.isAuth) {
    const user = req.results.user;
    const friend = req.body.friend;

    User.findById(user.id)
      .then((response) => {
        friendExist = user.friends.map((item) => item.id).includes(friend.id);
        if (friendExist || friend.id === user.id) res.end();
        else {
          response
            .update({ $push: { friends: friend } })
            .then((resp) => res.send(resp));
        }
      })
      .catch((error) => res.status(400).send(error.message));
  } else res.status(400).json(req.results);
};

module.exports.removeFriend = (req, res, next) => {
  if (req.results.isAuth) {
    const user = req.results.user;
    const friend = req.body.friend;

    User.findById(user.id)
      .then((response) => {
        response
          .update({ $pull: { friends: friend } })
          .then((resp) => res.send(resp));
      })
      .catch((error) => res.status(400).send(error.message));
  } else res.status(400).json(req.results);
};
