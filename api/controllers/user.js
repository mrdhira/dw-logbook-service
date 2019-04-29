const userService = require('../service/user');
const {
  logGreen,
  statusMessage
} = require('../../lib/console');

// CREATE USER
module.exports.createUser = (request, h) => {
  logGreen('USER CONTROLLER - CREATE USER');
  const { line_id, full_name } = request.payload;
  return userService.findUser(line_id)
  .then( async (user) => {
    if (!user) {
      return userService.createUser(line_id, full_name)
      .then( (user) => statusMessage(200, 'Create user succesfully!', false));
    };
    return statusMessage(202, 'User already exists!', false);
  }).catch( (err) => statusMessage(500, err, true));
};

// UPDATE COOKIE
module.exports.updateCookie = (request, h) => {
  logGreen('USER CONTROLLER - UPDATE COOKIE');
  const { line_id, cookie } = request.payload;
  console.log(request.payload)
  return userService.findUser(line_id)
  .then( async (user) => {
    if (!user) return statusMessage(401, 'User not exists!', false);
    return userService.updateCookie(line_id, cookie)
    .then( (user) => statusMessage(200, 'Update cookie succesfully!', false));
  }).catch( (err) => statusMessage(500,err, true));
};

// UPDATE NAME
module.exports.updateName = (request, h) => {
  logGreen('USER CONTROLLER - UPDATE NAME');
  const { line_id, full_name } = request.payload;
  return userService.findUser(line_id)
  .then( async (user) => {
    if (!user) return statusMessage(401, 'User not exists!', false);
    return userService.updateName(line_id, full_name)
    .then( (user) => statusMessage(200, 'Update name succesfully!', false));
  }).catch( (err) => statusMessage(500, err.response.message, true));
};

// FIND USER BY LINE_ID
module.exports.findUser = (request, h) => {
  logGreen('USER CONTROLLER - FIND USER');
  const { line_id } = request.params;
  return userService.findUser(line_id)
  .then( (user) => {
    if (!user) return statusMessage(202, 'User not exists!', false);
    return statusMessage(200, 'User exists!', false, user);
  }).catch( (err) => statusMessage(500, err.message, true));
};

module.exports.findAllUser = (request, h) => {
  logGreen('USER CONTROLLER - FIND ALL USER');
  return userService.findAllUser()
  .then( (user) => {
    if (!user) return statusMessage(202, 'There is no user!', false);
    return statusMessage(200, 'User data!', false, user);
  }).catch( (err) => statusMessage(500, err.message, true));
};

module.exports.updateUserOption = (request, h) => {
  logGreen('USER CONTROLLER - UPDATE USER OPTION');
  const { line_id, option, value } = request.payload;
  const options = [ {[option]: value}, {where: {line_id}} ];
  return userService.updateUserOption(options)
  .then( () => statusMessage(200, 'Update user '))
  .catch( (err) => statusMessage(500, err.message, true));
};
