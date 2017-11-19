module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('UserGroup', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    group_id: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'groups',
        key: 'id',
      },
    },
    user_role: {
      type: DataTypes.ENUM,
      values: ['admin', 'member'],
      allowNull: false,
      defaultValue: 'member',
    },
  }, {
    tableName: 'user_group',
    timestamps: true,
    underscored: true,
  });

  return Group;
};
