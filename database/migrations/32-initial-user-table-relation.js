'use_strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tbl_user', 'profile_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbl_profile',
          key: 'id'
        },
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('tbl_user', 'profile_id')
  }
}
