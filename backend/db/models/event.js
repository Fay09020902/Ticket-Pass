'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.hasMany(
        models.Ticket,
        {
          foreignKey:"eventId",
          onDelete: 'CASCADE',
          hooks: true
        }
      );
      Event.hasMany(
        models.Comment,
        {
          foreignKey:"eventId",
          onDelete: 'CASCADE',
          hooks: true
        }
      );
      Event.hasMany(
        models.Seat,
        {
          foreignKey:"eventId",
          onDelete: 'CASCADE',
          hooks: true
        }

      );
      Event.belongsTo(
        models.User,
        {
          foreignKey:"userId"
        }
      );
    }
  }
  Event.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 100],
          msg: "Name must be between 5 and 100 characters"
        },
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Name cannot be null"
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Artist cannot be empty"
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description cannot be empty"
        },
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['R&B','Rock', 'Pop', 'Blues', 'Jazz']],
          msg: "Type must be one of R&B, Rock, Pop, Blues, Jazz"
        },
        notNull: {
          args: true,
          msg: "Type cannot be null"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Price cannot be null"
        }
      }
    },
    country: DataTypes.STRING,
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image URL cannot be empty"
        },
        isUrl: {
          args: true,
          msg: "Image URL is invalid"
        }
      }
    },
    ticketavailability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
