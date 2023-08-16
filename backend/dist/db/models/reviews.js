"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const review_images_1 = __importDefault(require("./review-images"));
const { sequelize } = require('./index');
class Review extends sequelize_1.Model {
}
Review.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    review: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        defaultValue: "",
        validate: {
            goodReview(value) {
                if (!value.startsWith(' ')) {
                    throw new Error('Review can not start with spaces');
                }
            }
        }
    },
    score: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        validate: {
            len: [1, 1]
        }
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    spotId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    }
}, {
    sequelize,
    modelName: 'Review',
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt", "userId", "spotId",]
        }
    }
});
Review.hasMany(review_images_1.default, {
    sourceKey: 'id',
    foreignKey: 'reviewId',
    as: 'ReviewImage'
});
review_images_1.default.belongsTo(Review, { targetKey: 'id' });
exports.default = Review;
//# sourceMappingURL=reviews.js.map