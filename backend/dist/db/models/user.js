"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sequelize_1 = require("sequelize");
const userimage_1 = __importDefault(require("./userimage"));
class User extends sequelize_1.Model {
}
;
const sequelize = new sequelize_1.Sequelize('sqlite://root:anthonybronca@localhost:8000/dist/db/dev.db');
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
        validate: {
            len: [4, 30],
        }
    },
    hashedpassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            len: [3, 256]
        }
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
    modelName: 'User',
    tableName: 'User',
    sequelize,
    defaultScope: {
        attributes: {
            exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
    }
});
User.hasMany(userimage_1.default, {
    sourceKey: 'id',
    foreignKey: 'userid',
    as: 'userimages'
});
module.exports = User;
