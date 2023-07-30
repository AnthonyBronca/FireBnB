"use strict";
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
;
const sequelize = new sequelize_1.Sequelize('sqlite://root:anthonybronca@localhost:8000/dev.db');
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hashedpassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    profileimage: {
        type: sequelize_1.DataTypes.STRING,
    },
    bio: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date()
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date()
    }
}, {
    tableName: 'users',
    sequelize: sequelize
});
module.exports = User;
