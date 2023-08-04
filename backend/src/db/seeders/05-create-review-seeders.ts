'use strict';

import { OptionsInterface } from "../../typings/seeders";

const bcrypt = require("bcryptjs");

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
      score: 5,
      review: "This place was awesome!",
    },
    {
      userId: 1,
      spotId: 2,
      score: 3,
      review: "Nvm this place was ehh!",
    },
    {
      userId: 1,
      spotId: 2,
      score: 1,
      review: "eww this place sucked",
    },
    {
      userId: 2,
      spotId: 1,
      score: 5,
      review: "Loved my stay here!!",
    },


    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
