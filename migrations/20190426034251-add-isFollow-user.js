'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'isFollow', { type: Sequelize.INTEGER, defaultValue: null })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'isFollow')
  },
};
