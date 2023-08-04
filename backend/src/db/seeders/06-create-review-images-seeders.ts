'use strict';

import { OptionsInterface } from "../../typings/seeders";


let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
         {
            reviewId: 1,
            url: "review1Image1.com",

        },
         {
            reviewId: 1,
            url: "review2Image2.com",

        },
        {
         reviewId: 2,
            url: "review1Image1.com",
        },
        {
         reviewId: 2,
            url: "review2Image2.com",
        }
    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
