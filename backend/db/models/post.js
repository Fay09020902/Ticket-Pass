"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: [1, 100],
        },
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: [1, 1000],
        },
      },
    },
    {}
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {foreignKey: "userId"});
    Post.belongsTo(models.Event, {foreignKey: "eventId"});
    Post.hasMany(models.Reply, {foreignKey: "postId", onDelete: "CASCADE", hooks: true});
  };
  return Post;
};
