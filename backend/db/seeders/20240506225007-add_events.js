'use strict';
const { Event } = require('../models')


const concertEvents = [
  {
    name: "Rock Concert",
    userId: 1,
    artist: "Foo Fighters",
    type: "Concert",
    address: "123 Main Street",
    city: "New York",
    time: "7:00 PM",
    date: new Date('2024-05-15'),
    price: 50.00,
    country: "USA",
    img_url: "https://plus.unsplash.com/premium_photo-1681503974123-6cada12d0414?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ticketavailability: true
  },
  {
    name: "Pop Concert",
    userId: 2,
    artist: "Taylor Swift",
    type: "Concert",
    address: "456 Broadway",
    city: "Los Angeles",
    time: "8:00 PM",
    date: new Date('2024-06-20'),
    price: 60.00,
    country: "USA",
    img_url: "https://images.unsplash.com/photo-1692796226663-dd49d738f43c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMGNvbmNlcnQlMjB0YXlsb3J8ZW58MHx8MHx8fDA%3D",
    ticketavailability: true
  },
];

module.exports = {
    async up (queryInterface, Sequelize) {
      await Event.bulkCreate(concertEvents, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    // Remove all concert events from the Events table
    await queryInterface.bulkDelete('Events', null, {});
  }
};
