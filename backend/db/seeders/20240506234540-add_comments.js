'use strict';
const { Comment } = require('../models');

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
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
