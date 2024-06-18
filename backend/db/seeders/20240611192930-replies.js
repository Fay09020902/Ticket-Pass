"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Replies", [
      {
        userId: 2,
        postId: 1,
        body: "100% this^^^",
        createdAt: new Date("2022-08-01"),
        updatedAt: new Date("2022-08-01"),
      },
      {
        userId: 3,
        postId: 1,
        body: "Yeah, agreed",
        createdAt: new Date("2022-08-02"),
        updatedAt: new Date("2022-08-02"),
      },
      {
        userId: 2,
        postId: 1,
        body: "Same here",
        createdAt: new Date("2022-08-03"),
        updatedAt: new Date("2022-08-03"),
      },
      {
        userId: 2,
        postId: 2,
        body: "Yeah, message me",
        createdAt: new Date("2022-08-04"),
        updatedAt: new Date("2022-08-04"),
      },
      {
        userId: 2,
        postId: 3,
        body: "100% this^^^",
        createdAt: new Date("2022-08-05"),
        updatedAt: new Date("2022-08-05"),
      },
      {
        userId: 3,
        postId: 3,
        body: "Yeah, agreed",
        createdAt: new Date("2022-08-06"),
        updatedAt: new Date("2022-08-06"),
      },
      {
        userId: 2,
        postId: 5,
        body: "I stopped paying attention to the lineup a couple years ago. I just show up and go wherever feels/sounds good. This is the way.",
        createdAt: new Date("2022-08-09"),
        updatedAt: new Date("2022-08-09"),
      },
      {
        userId: 3,
        postId: 5,
        body: "Yes. Honestly a festival is gonna be more for the vibe and environment than the artist.",
        createdAt: new Date("2022-08-10"),
        updatedAt: new Date("2022-08-10"),
      },
      {
        userId: 3,
        postId: 6,
        body: "Done both. It's very, \"nice to have\" but you can skip it for sure, it doesn't make or break the experience, imo.",
        createdAt: new Date("2022-08-13"),
        updatedAt: new Date("2022-08-13"),
      },
      {
        userId: 3,
        postId: 9,
        body: "Yeah, agreed",
        createdAt: new Date("2022-08-02"),
        updatedAt: new Date("2022-08-02"),
      },
      {
        userId: 2,
        postId: 10,
        body: "100% this^^^",
        createdAt: new Date("2022-08-04"),
        updatedAt: new Date("2022-08-04"),
      },
      {
        userId: 3,
        postId: 10,
        body: "Yeah, agreed",
        createdAt: new Date("2022-08-05"),
        updatedAt: new Date("2022-08-05"),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Replies");
  },
};
