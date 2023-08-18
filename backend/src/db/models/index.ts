const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const basename = path.basename(__filename);
const config = require(__dirname + '/../../config/database')[env];

const db:any = {};

export const sequelize = config.use_env_variable
? new Sequelize(process.env[config.use_env_variable], config)
: new Sequelize(config.database, config.username, config.password, config);

// import User from './user'
// console.log(User)

// let sequelize:any;
// if (config.use_env_variable) {
//     sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//     sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
// .readdirSync(__dirname)
// .filter((file:string) => {
//     return (
//         file.indexOf('.') !== 0 &&
//         file !== basename &&
//         file.slice(-3) === '.js' &&
//         file.indexOf('.test.js') === -1
//         );
//     })
//     .forEach((file:string) => {
//         // console.log(path.join(__dirname, file), "<-----")
//         // console.log(fileImport)
//         // console.log(User)
//         const model = require(path.join(__dirname, file));
//         db[model.name] = model;
//     });

// Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

exports = db;

// module.exports = db,{ Sequelize, sequelize };
