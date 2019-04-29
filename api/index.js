const Logbook = require('./handlers/logbook');
const User = require('./handlers/user');

module.exports = {
  register: (server) => {
    server.route([
      { method: 'POST', path: '/logbook/createUser', config: User.createUser },
      { method: 'PUT', path: '/logbook/updateCookie', config: User.updateCookie },
      { method: 'PUT', path: '/logbook/updateName', config: User.updateName },
      { method: 'GET', path: '/logbook/user/{line_id}', config: User.findUser },
      { method: 'GET', path: '/logbook/user', config: User.findAllUser },
      { method: 'PUT', path: '/logbook/updateUserOption', config: User.updateUserOption },
      { method: 'POST', path: '/logbook/login', config: Logbook.login },
      { method: 'POST', path: '/logbook/checkLogbook', config: Logbook.checkLogbook },
      { method: 'POST', path: '/logbook/insertLogbook', config: Logbook.insertLogbook },
    ]);
  },
  name: 'api-plugin'
};
