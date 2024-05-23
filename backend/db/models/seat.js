'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      Seat.belongsTo(models.Event, { foreignKey: 'eventId' });
    }
  }
  Seat.init({
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'Row number must be at least 1'
        },
        max: {
          args: 20,
          msg: 'Row number cannot be greater than 20'
        }
      }
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'Seat number must be at least 1'
        },
        max: {
          args: 20,
          msg: 'Seat number cannot be greater than 20'
        }
      }
    },
    isSelected: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};
