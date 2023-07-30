'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface:any, Sequelize:any) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('UserImages', [
      { userid: 1, url: 'test' }
    ])
  },

  async down(queryInterface:any, Sequelize:any) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
