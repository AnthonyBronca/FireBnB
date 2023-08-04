'use strict';

import { OptionsInterface } from "../../typings/seeders";

const bcrypt = require("bcryptjs");

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
        {
      address: "123 royal lane",
      zipcode: 31313,
      city: "Orlando",
      state: "FL",
      spotType: "apartment",
      description: "Cozy 1x1 apartment at Lake Baldwin",
      userId: 1,
    },
        {
      address: "123 Omega Blvd",
      zipcode: 31313,
      city: "Orlando",
      state: "FL",
      spotType: "house",
      description: "Cozy house at Lake Baldwin",
      userId: 2,
    },
    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ["123 royal lane", "123 Omega Blvd"] }
    }, {});
  }
};
