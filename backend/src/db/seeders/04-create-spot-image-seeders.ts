'use strict';

import { OptionsInterface } from "../../typings/seeders";


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
            url: "spot1PreviewImage.com",
            isPreview: true,

        },
         {
            spotId: 1,
            url: "spot1Image.com",
            isPreview: false,

        },
        {
         spotId: 2,
            url: "spot2PreviewImage.com",
            isPreview: true,
        },
        {
         spotId: 2,
            url: "spot2Image.com",
            isPreview: false,
        }
    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
