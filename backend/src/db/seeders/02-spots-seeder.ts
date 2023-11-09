'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
         {
            address: "123 North Alpine Drive",
            city: "Orlando",
            state: "FL",
            country: "United States of America",
            description: "A cozy 1 x 1 tucked in the Alpines",
            name: "The Alpine",
            lat: 33.00202,
            lng: 33.02412,
            price: 50,
            userId: 1,
         },
         {
            address: "456 South Pine way",
            city: "Orlando",
            state: "FL",
            country: "United States of America",
            description: "A cozy 2 story tucked in the Pines",
            name: "The Pine Grove",
            lat: 33.00302,
            lng: 33.024142,
            price: 45,
            userId: 2,
         },
    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
        {
    //   username: { [Op.in]: ['AnthonyB', 'Jade'] }
    }, {});
  }
};
