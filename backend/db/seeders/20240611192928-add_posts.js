'use strict';
const { Seat } = require('../models')
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", [
      {
        userId: 2,
        eventId: 2,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
        createdAt: new Date("2022-07-20"),
        updatedAt: new Date("2022-07-20"),
      },
      {
        userId: 3,
        eventId: 3,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
        createdAt: new Date("2022-07-21"),
        updatedAt: new Date("2022-07-21"),
      },
      {
        userId: 1,
        eventId: 3,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
        createdAt: new Date("2022-07-22"),
        updatedAt: new Date("2022-07-22"),
      },
      {
        userId: 2,
        eventId: 3,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
        createdAt: new Date("2022-07-23"),
        updatedAt: new Date("2022-07-23"),
      },
      {
        userId: 1,
        eventId: 4,
        title: "Anyone ever gone without knowing the lineup?",
        body: "I feel like sometimes we get so wrapped up in making each set and planning it perfectly, has anyone ever attended without knowing the schedule and just enjoyed the surprises?",
        createdAt: new Date("2022-07-24"),
        updatedAt: new Date("2022-07-24"),
      },
      {
        userId: 2,
        eventId: 4,
        title: "How much are VIP tickets and are they worth it?",
        body: "Hey y'all. I'm wondering how much does it cost? What does it give that GA doesn't? Is it worth it overall to those who have done it before?",
        createdAt: new Date("2022-07-25"),
        updatedAt: new Date("2022-07-25"),
      },
      {
        userId: 1,
        eventId: 4,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
        createdAt: new Date("2022-07-26"),
        updatedAt: new Date("2022-07-26"),
      },
      {
        userId: 3,
        eventId: 4,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
        createdAt: new Date("2022-07-27"),
        updatedAt: new Date("2022-07-27"),
      },
      {
        userId: 2,
        eventId: 4,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
        createdAt: new Date("2022-07-28"),
        updatedAt: new Date("2022-07-28"),
      },
      {
        userId: 3,
        eventId: 6,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
        createdAt: new Date("2022-07-29"),
        updatedAt: new Date("2022-07-29"),
      },
      {
        userId: 2,
        eventId: 3,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
        createdAt: new Date("2022-07-29"),
        updatedAt: new Date("2022-07-29"),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(options, {
      postId: { [Sequelize.Op.in]: [1, 2, 3, 4, 5, 6, 7, 8,9,10,11] }
    });
  },
};
