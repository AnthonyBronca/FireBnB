"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const spots_1 = require("./spots");
const sequelize = new sequelize_1.Sequelize('sqlite3://root:anthonybronca@localhost:8000/');
class Review extends sequelize_1.Model {
}
exports.Review = Review;
Review.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    spotId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    review: {
        type: sequelize_1.DataTypes.TEXT
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
    tableName: 'reviews',
    sequelize
});
Review.belongsTo(user_1.User, {
    targetKey: 'id'
});
Review.belongsTo(spots_1.Spot, {
    targetKey: 'id'
});
