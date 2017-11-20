module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM,
      values: ['admin', 'member'],
      allowNull: false,
      defaultValue: 'member',
    });
    queryInterface.addColumn('users', 'active', {
      type: Sequelize.ENUM,
      values: ['Y', 'N'],
      allowNull: false,
      defaultValue: 'Y',
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'role');
    queryInterface.removeColumn('users', 'active');
  },
};
