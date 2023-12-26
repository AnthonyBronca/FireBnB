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
    userId: 1,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=7027129476710400"
  }, {
    userId: 2,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=2113845558509568"
  }, {
    userId: 3,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=2163689075507200"
  }, {
    userId: 4,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=7796297922772992"
  }, {
    userId: 5,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=2171903619891200"
  }, {
    userId: 6,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=4808966531973120"
  }, {
    userId: 7,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=5301580265947136"
  }, {
    userId: 8,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=2953365925396480"
  }, {
    userId: 9,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=7403389080043520"
  }, {
    userId: 10,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=942557599105024"
  }, {
    userId: 11,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=6899608806490112"
  }, {
    userId: 12,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=5987202553085952"
  }, {
    userId: 13,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=5145625167396864"
  }, {
    userId: 14,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=7217319914766336"
  }, {
    userId: 15,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=7112774821871616"
  }, {
    userId: 16,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=7319846660341760"
  }, {
    userId: 17,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=1500493406797824"
  }, {
    userId: 18,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=7876534186541056"
  }, {
    userId: 19,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=1264111300116480"
  }, {
    userId: 20,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=2147954517344256"
  }, {
    userId: 21,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=6035552885276672"
  }, {
    userId: 22,
    isProfile: true,
    url: "https://loremflickr.com/640/480/person?lock=4879040343179264"
  }
], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'UserImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
        {
    }, {});
  }
};
