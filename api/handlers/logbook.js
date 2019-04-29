const joi = require('joi');
const Logbook = require('../controllers/logbook');

module.exports = {
  login: {
    tags: ['logbook'],
    handler: Logbook.login,
    validate: {
      options: {
        allowUnknown: true,
      },
      payload: {
        username: joi.number().required(),
        password: joi.string().required(),
      },
    },
  },
  checkLogbook: {
    tags: ['logbook'],
    handler: Logbook.checkLogbook,
    validate: {
      options: {
        allowUnknown: true,
      },
      payload: {
        cookie: joi.string().required(),
      },
    },
  },
  insertLogbook: {
    tags: ['logbook'],
    handler: Logbook.insertLogbook,
    validate: {
      options: {
        allowUnknown: true,
      },
      payload: {
        cookie: joi.string().required(),
        clock_in: joi.string().required(),
        clock_out: joi.string().required(),
        activity: joi.string().required(),
        description: joi.string().required(),
      },
    },
  },
};
