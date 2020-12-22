const configs = {
  development: {
    SERVER_URI: "http://localhost:4000",
  },
  production: {
    SERVER_URI: "https://aymen-friends-mern.herokuapp.com",
  },
};

module.exports.configs = configs[process.env.NODE_ENV];
