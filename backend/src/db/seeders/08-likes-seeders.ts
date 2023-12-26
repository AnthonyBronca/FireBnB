'use strict';

import { OptionsInterface } from "../../typings/seeders";



let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
} else{

}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Likes';
    return queryInterface.bulkInsert(options, [
         {
            userId: 3,
            spotId: 1
         },
         {
            userId: 3,
            spotId: 2
         },
         {
            userId: 3,
            spotId: 5
         },
         {
            userId: 3,
            spotId: 8
         },
         {
            userId: 3,
            spotId: 10
         },
         {
            userId: 3,
            spotId: 15
         },
         {
            userId: 3,
            spotId: 16
         },
         {
            userId: 3,
            spotId: 1
         },
    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Likes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
        {
    }, {});
  }
};
