"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const basename = path.basename(__filename);
const config = require(__dirname + '/../../config/database')[env];
const db = {};
exports.sequelize = config.use_env_variable
    ? new Sequelize(process.env[config.use_env_variable], config)
    : new Sequelize(config.database, config.username, config.password, config);
db.sequelize = exports.sequelize;
db.Sequelize = Sequelize;
exports = db;
//# sourceMappingURL=index.js.map