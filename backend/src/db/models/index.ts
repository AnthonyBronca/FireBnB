const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = require(__dirname + '/../../config/database')[env];


const sequelize = config.url
    ? new Sequelize(config.url, config)
    : new Sequelize(config.database, config.username, config.password, config);

module.exports = { Sequelize, sequelize };
export {};
