const { config } = require("dotenv");
config({
  path: `./.env.${process.env.NODE_ENV ? process.env.NODE_ENV : "staging"}`,
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,

  //CONFIG
  MONGODB_URI: process.env.MONGODB_URI,

  //ENV
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  isDevelopment: process.env.NODE_ENV === "development"
};
