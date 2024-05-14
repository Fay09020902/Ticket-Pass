'use strict';
const { Comment } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const commentData = [
  {
    text: "Great event!",
    eventId: 1,
    userId: 1
  },
  {
    text: "Awesome performance!",
    eventId: 2,
    userId: 1
  },
  {
    text: "Really good",
  eventId: 2,
  userId: 3

  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Comment.bulkCreate(commentData);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      text: { [Op.in]: ['Really good', 'Awesome performance!', 'Great event!'] }
    }, {});
  }
};
