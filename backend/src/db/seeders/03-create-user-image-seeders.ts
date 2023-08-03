'use strict';

import { OptionsInterface } from "../../typings/seeders";


let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'UserImages';
    return queryInterface.bulkInsert(options, [
         {
            userId: "1",
            url: "anthonyprofileimage.com",
            isProfile: true,

        },
         {
            userId: "1",
            url: "anthonyheaderimage.com",
            isProfile: false,

        },
        {
         userId: "2",
            url: "jadeprofileimage.com",
            isProfile: true,
        },
        {
         userId: "2",
            url: "jadeheaderimage.com",
            isProfile: false,
        }
    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'UserImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['AnthonyB', 'Jade'] }
    }, {});
  }
};
