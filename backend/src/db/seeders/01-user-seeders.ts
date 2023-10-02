'use strict';

import { OptionsInterface } from "../../typings/seeders";

const bcrypt = require("bcryptjs");

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// import { users } from "../../utils/users_seeder_maker";


module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
         {
        firstName: "Anthony",
        lastName: "bronca",
        email: 'anthony@user.io',
        username: 'AnthonyB',
        bio: "I made this site with Typescript :D",
        hashedPassword: bcrypt.hashSync('password3')
      },
        {
        firstName: "Jade",
        lastName: "Grabow",
        email: 'jade@user.io',
        username: 'Jade',
        bio: "I am the most beautiful girl ever",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: "Demo-firstName",
        lastName: "Demp-lastName",
        email: 'demo@demouser.io',
        username: 'Demo-user',
        bio: "I made this site with Typescript :D",
        hashedPassword: bcrypt.hashSync('StrongDemoPassword!')
      },
    //   ...users
    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['AnthonyB', 'Jade'] }
    }, {});
  }
};
