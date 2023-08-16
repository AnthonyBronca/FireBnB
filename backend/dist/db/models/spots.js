"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const spot_images_1 = __importDefault(require("./spot-images"));
const reviews_1 = __importDefault(require("./reviews"));
const { sequelize } = require('./index');
class Spot extends sequelize_1.Model {
}
Spot.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    zipcode: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        validate: {
            len: [5, 5]
        }
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 2]
        }
    },
    spotType: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
        validate: {
            goodDescription(value) {
                if (!value.startsWith(' ')) {
                    throw new Error('Description can not start with spaces');
                }
            }
        }
    },
    lat: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    long: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    available: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    }
}, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt", "lat", "long",]
        }
    }
});
Spot.hasMany(spot_images_1.default, {
    sourceKey: 'id',
    foreignKey: 'spotId',
    as: 'SpotImage'
});
spot_images_1.default.belongsTo(Spot, { targetKey: 'id' });
Spot.hasMany(reviews_1.default, {
    sourceKey: 'id',
    foreignKey: 'spotId',
    as: 'Review'
});
reviews_1.default.belongsTo(Spot, { targetKey: 'id' });
exports.default = Spot;
//# sourceMappingURL=spots.js.map