"use strict";
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('sqlite://root:anthonybronca@localhost:8000/dist/db/dev.db');
class UserImage extends sequelize_1.Model {
}
;
const sequelize = new sequelize_1.Sequelize('sqlite://root:anthonybronca@localhost:8000/dev.db');
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
    modelName: 'UserImage',
    tableName: 'UserImage',
    sequelize
});
module.exports = UserImage;
