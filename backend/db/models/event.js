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
        models.Post,
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
      validate: {
        notEmpty: {
          args: true,
          msg: "Address cannot be empty"
        },
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "City cannot be empty"
        },
      }
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "time cannot be empty"
        },
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Date cannot be empty"
        },
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price cannot be null"
        },
        isFloat: {
          args: { min: 0, max: 10000 },
          msg: "Price must be a positive number and cannot exceed 10,000"
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Country cannot be empty"
        },
      }
    },
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
