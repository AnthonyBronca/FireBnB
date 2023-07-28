'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Spots', [
      { address: '1000 N. Address Way', zipcode: '55555', city: 'Miami', state: 'FL', description: '2 bedroom house', lat: 10.00, long: 20.00, userId: 1, available: true },
      { address: '2000 S. Address Way', zipcode: '55556', city: 'Orlando', state: 'FL', description: '1 bedroom house', lat: 10.00, long: 20.00, userId: 1, available: false }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
