'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Event, { foreignKey: 'eventId' });
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Comment.init({
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventId:
    {type: DataTypes.INTEGER,
      allowNull: false},
    userId:  {type: DataTypes.INTEGER,
      allowNull: false},
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
