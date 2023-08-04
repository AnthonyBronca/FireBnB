'use strict';

import { OptionsInterface } from "../../typings/seeders";


let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
         {
            userId: 1,
            spotId: 2,
            startDate: new Date(2023,9,10),
            endDate: new Date(2023,9,20),
        },
         {
            userId: 1,
            spotId: 1,
            startDate: new Date(2023,10,10),
            endDate: new Date(2023,10,20),
        },
    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
