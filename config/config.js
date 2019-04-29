require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASS,
    database: process.env.DB_DEV_DATABASE,
    host: '127.0.0.1',
    dialect: "postgres",
    // logging: true,
  },
  production: {
    username: process.env.DB_PRD_USER,
    password: process.env.DB_PRD_PASS,
    database: process.env.DB_PRD_DATABASE,
    host: '127.0.0.1',
    dialect: "postgres",
    // logging: false,
  }
};
