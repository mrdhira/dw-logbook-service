'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'isDailyReminder', { type: Sequelize.INTEGER, defaultValue: null }),
      queryInterface.addColumn('users', 'isAutoFillWeekend', { type: Sequelize.INTEGER, defaultValue: null }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'isDailyReminder'),
      queryInterface.removeColumn('users', 'isAutoFillWeekend'),
    ]);
  },
};
