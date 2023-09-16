"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Spot extends sequelize_1.Model {
        static associate(models) {
            Spot.belongsTo(models.User, { foreignKey: 'userId', as: "Owner" });
            Spot.hasMany(models.SpotImage, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true });
            Spot.hasMany(models.Review, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true });
            Spot.hasMany(models.Booking, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true });
        }
    }
    Spot.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        address: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                goodDescription(value) {
                    if (value.startsWith(' ')) {
                        throw new Error('Description can not start with spaces');
                    }
                }
            }
        },
        lat: {
            type: DataTypes.STRING,
        },
        long: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER
        },
    }, {
        sequelize,
        modelName: "Spot",
        defaultScope: {
            attributes: {
                exclude: []
            }
        },
    });
    return Spot;
};
//# sourceMappingURL=02-spots.js.map