'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Function to generate seat grid for multiple events
    const generateSeatsForEvents = (rows, cols, eventIds) => {
      const seats = [];
      eventIds.forEach(eventId => {
        for (let row = 1; row <= rows; row++) {
          for (let number = 1; number <= cols; number++) {
            seats.push({
              eventId: eventId,
              row: row,
              number: number,
              status: true,  // Assuming 'true' means available
            });
          }
        }
      });
      return seats;
    };

    // Generate seats for events 1 through 6 with a grid of 5 rows and 5 columns each
    const seats1 = generateSeatsForEvents(5, 5, [1, 2, 3, 4, 5, 6]);
    const seats2 = generateSeatsForEvents(8, 8, [7, 8]);

    const seats = seats1.concat(seats2);

    console.log('Generated Seats:', seats);

    // Bulk insert generated seats into the database
    try {
      await queryInterface.bulkInsert('Seats', seats);
    } catch (error) {
      console.error('Error during bulk insert of seats:', error);
      throw error; // Rethrow to catch the error at a higher level if needed
    }
  },

  async down(queryInterface, Sequelize) {
    // Delete all seats for these event IDs
    await queryInterface.bulkDelete('Seats', {
      eventId: { [Sequelize.Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    });
  }
};