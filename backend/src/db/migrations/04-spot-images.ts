"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if(process.env.NODE_ENV === 'production'){
    options.schema  =process.env.SCHEMA;
}

module.exports = {
    up:async(queryInterface:any, Sequelize:any) => {
        return queryInterface.createTable("SpotImages", {
            id: {
                allowNull:false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            spotId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: "Spots", schema: 'schema'},
                onDelete: 'CASCADE'
            },
            url: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: ""
            },
            preview: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
            },

        }, options);
    },
    down: async (queryInterface:any, Sequelize:any) => {
      options.tableName = "SpotImages";
      return queryInterface.dropTable(options);
}
}
