'use strict';

import { OptionsInterface } from "../../typings/seeders";

const bcrypt = require("bcryptjs");

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'TestUsers';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo123@user.io',
        username: 'Demo-lition123123',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user232@user.io',
        username: 'FakeUser212',
        hashedPassword: bcrypt.hashSync('password3')
      },
         {
        email: 'anthony@user.io',
        username: 'AnthonyB',
        hashedPassword: bcrypt.hashSync('password3')
      },
        {
        email: 'jade@user.io',
        username: 'Jade',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'TestUsers';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition123123', 'FakeUser212', 'AnthonyB', 'Jade'] }
    }, {});
  }
};
