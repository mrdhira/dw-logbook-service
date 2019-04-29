'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      line_id: 'Ubeea52ef11660484b2498097ed881012',
      cookie: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      full_name: 'Dhira Wigata',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
