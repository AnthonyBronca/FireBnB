'use strict';

import { OptionsInterface } from "../../typings/seeders";
import seederReviews from "../../utils/reviewSeeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
         {
            userId: 1,
            spotId: 2,
            stars: 5,
            review: "This place was amazing!"
         },
           {
            userId: 2,
            spotId: 1,
            stars: 4,
            review: "This place was pretty good!"
         },
         ...seederReviews,
    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
        {
    //   username: { [Op.in]: ['AnthonyB', 'Jade'] }
    }, {});
  }
};
