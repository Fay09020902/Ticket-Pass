'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.Event, { foreignKey: 'eventId' });
      Ticket.belongsTo(models.User, { foreignKey: 'userId' });
      Ticket.belongsTo(models.Seat, { foreignKey: 'seatId' });
    }
  }
  Ticket.init({
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seatId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};
