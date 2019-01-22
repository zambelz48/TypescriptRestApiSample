'use_strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_account', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      balance: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdBy: {
        type: Sequelize.STRING(32),
        allowNull: true
      },
      updatedBy: {
        type: Sequelize.STRING(32),
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tbl_account')
  }
}
