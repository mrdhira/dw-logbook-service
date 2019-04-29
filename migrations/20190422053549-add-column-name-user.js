'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'full_name', {
      type: Sequelize.STRING,
      defaultValue: null,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'full_name');
  },
};
