'use strict';

import { OptionsInterface } from "../../typings/seeders";
import generateSpotImageSeeders from "../../utils/spotImageSeeders";

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
            url: "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
            preview: true,
         },
        {
            spotId: 2,
            url: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
            preview: true,
         },
         ...generateSpotImageSeeders()

    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
        {
    }, {});
  }
};
