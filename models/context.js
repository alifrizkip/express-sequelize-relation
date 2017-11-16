module.exports = (sequelize, DataTypes) => {
  const Context = sequelize.define('Context', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        Context.hasMany(models.Task, {
          foreignKey: 'ContextId',
          onDelete: 'CASCADE',
        });
        Context.belongsTo(models.User, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Context;
};
