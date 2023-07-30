"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('sqlite://root:anthonybronca@localhost:8000/dev.db');
const user_1 = __importDefault(require("./user"));
class UserImage extends sequelize_1.Model {
}
;
UserImage.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userid: {
        type: sequelize_1.DataTypes.INTEGER
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
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
    tableName: 'userImages',
    sequelize
});
UserImage.belongsTo(user_1.default, {
    targetKey: 'id'
});
module.exports = UserImage;
