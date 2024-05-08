'use strict';
const { Event } = require('../models')


const concertEvents = [
  {
    name: "Madeleine Peyroux",
    userId: 1,
    artist: "Foo Fighters",
    type: "Rock",
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
    name: "Damn Right Farewell",
    userId: 2,
    artist: "Taylor Swift",
    type: "Pop",
    address: "456 Broadway",
    city: "Los Angeles",
    time: "8:00 PM",
    date: new Date('2024-06-20'),
    price: 60.00,
    country: "USA",
    img_url: "https://images.unsplash.com/photo-1692796226663-dd49d738f43c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMGNvbmNlcnQlMjB0YXlsb3J8ZW58MHx8MHx8fDA%3D",
    ticketavailability: true
  },
  {name: "The Winding Way Tour",
  userId: 2,
  artist: "Taylor Swift",
  type: "Pop",
  address: "456 Broadway",
  city: "Los Angeles",
  time: "8:00 PM",
  date: new Date('2024-06-20'),
  price: 60.00,
  country: "USA",
  img_url: "https://images.unsplash.com/photo-1692796226663-dd49d738f43c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMGNvbmNlcnQlMjB0YXlsb3J8ZW58MHx8MHx8fDA%3D",
  ticketavailability: true
  },
  {
    name: "Prof, Futuristic",
    userId: 1,
    artist: "Caelan Cardello Trio",
    type: "Jazz",
    address: "101 Jazz Avenue",
    city: "New Orleans",
    time: "9:00 PM",
    date: new Date('2024-08-25'),
    price: 70.00,
    country: "USA",
    img_url: "https://i.ticketweb.com//i/00/12/27/82/64_Edp.jpg?v=1",
    ticketavailability: true
  },
  {
    name: "Red Hot Chili Peppers",
    userId: 1,
    artist: "Red Hot Chili Peppers",
    type: "Rock",
    address: "123 Main Street",
    city: "New York",
    time: "7:00 PM",
    date: new Date('2024-05-15'),
    price: 75.00,
    country: "USA",
    img_url: "https://upload.wikimedia.org/wikipedia/en/5/5f/The_Red_Hot_Chili_Peppers_%28album_cover%29.jpg",
    ticketavailability: true
  },
  {
    name: "Billie Eilish - Happier Than Ever Tour",
    userId: 2,
    artist: "Billie Eilish",
    type: "Pop",
    address: "456 Broadway",
    city: "Los Angeles",
    time: "8:00 PM",
    date: new Date('2024-06-20'),
    price: 90.00,
    country: "USA",
    img_url: "https://www.livenationentertainment.com/wp-content/uploads/2021/05/BILLIEEILISH_FB-NEWSFEED_1200x628.jpg",
    ticketavailability: true
  },
  {
    name: "John Legend - Bigger Love Tour",
    userId: 3,
    artist: "John Legend",
    type: "R&B",
    address: "789 Main Street",
    city: "Chicago",
    time: "7:30 PM",
    date: new Date('2024-07-25'),
    price: 85.00,
    country: "USA",
    img_url: "https://www.casinodelsol.com/sites/default/files/styles/default_lg/public/2021-06/johnlegend_2021_lovetour.jpg?itok=rx8LehTg",
    ticketavailability: true
  },
  {
    name: "Ella Fitzgerald Tribute Concert",
    userId: 3,
    artist: "Various Artists",
    type: "Jazz",
    address: "101 Jazz Avenue",
    city: "New Orleans",
    time: "9:00 PM",
    date: new Date('2024-08-10'),
    price: 60.00,
    country: "USA",
    img_url: "https://m.media-amazon.com/images/I/51l4ldEQSaL._UF1000,1000_QL80_.jpg",
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
