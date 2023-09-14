"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Review extends sequelize_1.Model {
        static associate(models) {
            Review.belongsTo(models.User, { foreignKey: 'userId' });
            Review.belongsTo(models.Spot, { foreignKey: 'spotId' });
            Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId' });
        }
        ;
    }
    Review.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        stars: {
            type: DataTypes.INTEGER,
            validate: {
                isGoodNumber(value) {
                    if (value < 0 || value > 5) {
                        throw new Error("Score must be a number from 0 - 5");
                    }
                }
            }
        },
        review: {
            type: DataTypes.STRING,
            validate: {
                goodDescription(value) {
                    if (value.startsWith(' ')) {
                        throw new Error('Description can not start with spaces');
                    }
                },
                len: [2, 70]
            }
        },
        userId: {
            type: DataTypes.INTEGER
        },
        spotId: {
            type: DataTypes.INTEGER
        },
    }, {
        sequelize,
        modelName: "Review",
        defaultScope: {
            attributes: {
                exclude: []
            }
        },
    });
    return Review;
};
//# sourceMappingURL=05-reviews.js.map