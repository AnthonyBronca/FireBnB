'use strict';

import { OptionsInterface } from "../../typings/seeders";

const bcrypt = require("bcryptjs");

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
         {
            spotId: 1,
            url: "spotSpotImage.com",
            preview: true,
         },
        {
            spotId: 2,
            url: "someOtherSpotImage.com",
            preview: true,
         },


    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
        {
    //   username: { [Op.in]: ['AnthonyB', 'Jade'] }
    }, {});
  }
};
