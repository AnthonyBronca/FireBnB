'use strict';

/** @type {import('sequelize-cli').Migration} */

const { users } = require('../../utils/user_seeder_maker')
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

    // await queryInterface.bulkInsert('Users', [
    //   { firstname: 'anthony', lastname: 'bronca', username: 'anthonybronca', hashedpassword: 'strongpassword', email: 'anthony@app.io', bio: 'this is a test', profileimage: 'test' },
    //   ...users
    // ])
    await queryInterface.bulkInsert('Users', users)
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
