"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Spot extends sequelize_1.Model {
        static associate(models) {
            Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: "Owner" });
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
        zipcode: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                len: [5, 5]
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 2]
            }
        },
        spotType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                checkSpotType(value) {
                    let allowedTypes = new Set(['apartment', 'house', 'duplex', 'condo']);
                    if (!allowedTypes.has(value.toLowerCase())) {
                        throw new Error('The Spot Type is currently not available to be listed on FirBnB at this time.');
                    }
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                goodDescription(value) {
                    if (!value.startsWith(' ')) {
                        throw new Error('Description can not start with spaces');
                    }
                }
            }
        },
        lat: {
            type: DataTypes.INTEGER,
        },
        long: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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