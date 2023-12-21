'use strict';

import { OptionsInterface } from "../../typings/seeders";
import randomUserProfiles from "../../utils/userImageSeeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'UserImages';
    return queryInterface.bulkInsert(options, [
      ...randomUserProfiles
    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'UserImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
        {
    //   username: { [Op.in]: ['AnthonyB', 'Jade'] }
    }, {});
  }
};
