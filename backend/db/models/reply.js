"use strict";
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    "Reply",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [1, 1000]
        },
      },
    },
    {}
  );
  Reply.associate = function (models) {
    Reply.belongsTo(models.User, {foreignKey: "userId"});
    Reply.belongsTo(models.Post, {foreignKey: "postId"});
  };
  return Reply;
};
