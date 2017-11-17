module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'groups',
    timestamps: true,
    underscored: true,
  });

  Group.associate = function (models) {
    Group.belongsToMany(models.User, {
      through: 'user_group',
      as: 'users',
      foreignKey: 'group_id',
    });
  }

  return Group;
};
