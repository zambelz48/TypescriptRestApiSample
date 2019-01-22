'use_strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(50),
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
    return queryInterface.dropTable('tbl_user')
  }
}
