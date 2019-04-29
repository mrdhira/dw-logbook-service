'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'isRegister'),
      queryInterface.removeColumn('users', 'isLogin'),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'isRegister', { type: Sequelize.INTEGER, defaultValue: null }),
      queryInterface.addColumn('users', 'isLogin', { type: Sequelize.INTEGER, defaultValue: null }),
    ]);
  }
};
