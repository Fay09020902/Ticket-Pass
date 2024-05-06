'use strict';
const { Ticket } = require('../models');

const ticketData = [
  {
    eventId: 1,
    userId: 1,
    quantity: 2
  },
  {
    eventId: 2,
    userId: 2,
    quantity: 1
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Ticket.bulkCreate(ticketData);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tickets', null, {});
  }
};
