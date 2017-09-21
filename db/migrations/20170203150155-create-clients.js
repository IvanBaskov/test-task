'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function (transaction) {
      return queryInterface.createTable('clients', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        phone: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        birthday: {
          type: Sequelize.DATEONLY
        },
        address: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, {transaction});
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function (transaction) {
      return queryInterface.dropTable('clients', {transaction});
    });
  }
};
