const Joi = require('joi');
const User = require('../controllers/user');

module.exports = {
  createUser: {
    tags: ['logbook'],
    handler: User.createUser,
    validate: {
      options: {
        allowUnknown: true,
      },
      payload: {
        line_id: Joi.string().required(),
        full_name: Joi.string().required(),
      },
    },
  },
  updateCookie: {
    tags: ['logbook'],
    handler: User.updateCookie,
    validate: {
      options: {
        allowUnknown: true,
      },
      payload: {
        line_id: Joi.string().required(),
        // cookie: Joi.string(),
      },
    },
  },
  updateName: {
    tags: ['logbook'],
    handler: User.updateName,
    validate: {
      options: {
        allowUnknown: true,
      },
      payload: {
        line_id: Joi.string().required(),
        full_name: Joi.string().required(),
      },
    },
  },
  findUser: {
    tags: ['logbook'],
    handler: User.findUser,
    validate: {
      options: {
        allowUnknown: true,
      },
      params: {
        line_id: Joi.string().required(),
      },
    },
  },
  findAllUser: {
    tags: ['logbook'],
    handler: User.findAllUser,
  },
  updateUserOption: {
    tags: ['logbook'],
    handler: User.updateUserOption,
    validate: {
      options: {
        allowUnknown: true,
      },
      // payload: {
      //   line_id: Joi.string().required(),
      //   option: Joi.string().valid([
      //     'isLogin',
      //     'isDailyReminder',
      //     'isAutoFillWeekend',
      //     'isFollow',
      //   ]).required(),
      //   value: Joi.number().valid([0, 1]).required(),
      // },
    },
  },
};
