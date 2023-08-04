"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    return queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: "Users", schema: 'schema'}
        },
      spotId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: "Spots", schema: 'schema'}
        },
        startDate: {
            allowNull:false,
            type: Sequelize.DATE
        },
        endDate: {
            allowNull:false,
            type: Sequelize.DATE
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        cancelledDate: {
            type: Sequelize.DATE,
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = "Bookings";
    return queryInterface.dropTable(options);
  }
};
