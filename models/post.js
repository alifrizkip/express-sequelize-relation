module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    post: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'posts',
    timestamps: true,
    underscored: true,
  });

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };

  return Post;
};
