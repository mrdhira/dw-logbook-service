const Model = require('../../models');
const { logGreen } = require('../../lib/console');

module.exports.createUser = (line_id, full_name) => {
  logGreen('USER SERVICE - CREATE USER');
  return Model.user.create({ line_id, full_name, isFollow: 1 });
};

module.exports.findUser = (line_id) => {
  logGreen('USER SERVICE - FIND USER');
  return Model.user.findOne({ where: {line_id} });
};

module.exports.findAllUser = () => {
  logGreen('USER SERVICE - FIND ALL USER');
  return Model.user.findAll();
};

module.exports.updateCookie = (line_id, cookie) => {
  logGreen('USER SERVICE - UPDATE COOKIE');
  return Model.user.update({
    cookie,
  }, { where: { line_id } });
};

module.exports.updateName = (line_id, full_name) => {
  logGreen('USER SERVICE - UPDATE NAME');
  return Model.user.update({
    full_name,
  }, { where: { line_id } });
};

module.exports.updateUserOption = (options) => {
  logGreen('USER SERVICE - UPDATE USER OPTION');
  return Model.user.update(
    ...options,
  );
};
