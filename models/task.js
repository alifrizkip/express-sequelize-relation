module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: 'Your to-do item name must between 3 and 50.',
        },
      },
    },
    done: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
  }, {
    classMethods: {
      associate(models) {
        Task.belongsTo(models.Context, {
          foreignKey: 'ContextId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Task;
};
