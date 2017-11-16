module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'addresses',
    timestamps: true,
    underscored: true,
  });

  Address.associate = function (models) {
    Address.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };

  return Address;
};
