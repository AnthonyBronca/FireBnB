"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize } = require('./index');
class Booking extends sequelize_1.Model {
}
Booking.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    spotId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            isAfter: '2014-12-31',
            isBefore: '2030-1-01',
        }
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            isAfter: '2014-12-31',
            isBefore: '2030-1-01',
        }
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    cancelledDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    }
}, {
    sequelize,
    modelName: 'Booking',
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt",]
        }
    }
});
exports.default = Booking;
//# sourceMappingURL=bookings.js.map