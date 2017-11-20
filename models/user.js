module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'member'],
      allowNull: false,
      defaultValue: 'member',
    },
    active: {
      type: DataTypes.ENUM,
      values: ['Y', 'N'],
      allowNull: false,
      defaultValue: 'Y',
    },
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  });

  User.associate = function (models) {
    User.hasMany(models.Post, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'posts',
    });

    User.hasOne(models.Address, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'address',
    });

    User.belongsToMany(models.Group, {
      through: 'user_group',
      as: 'groups',
      foreignKey: 'user_id',
    });
  };

  return User;
};
