"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Booking extends sequelize_1.Model {
        static associate(models) {
            Booking.belongsTo(models.User, { foreignKey: 'userId' });
            Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });
        }
        ;
    }
    Booking.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        spotId: {
            type: DataTypes.INTEGER
        },
        startDate: {
            type: DataTypes.STRING,
            validate: {
                isGoodStartDate(value) {
                    let today = new Date();
                    let startDate = new Date(value);
                    if (startDate < today) {
                        throw new Error('Start date can not be in the past');
                    }
                }
            }
        },
        endDate: {
            type: DataTypes.STRING,
            validate: {
                isGoodEndDate(value) {
                    let today = new Date();
                    let endDate = new Date(value);
                    if (endDate < today) {
                        throw new Error('End date can not be in the past');
                    }
                    let start = this.startDate;
                    if (start >= value) {
                        throw new Error('End date can not be before the start date');
                    }
                }
            }
        },
    }, {
        sequelize,
        modelName: "Booking",
        defaultScope: {
            attributes: {
                exclude: []
            }
        },
    });
    return Booking;
};
//# sourceMappingURL=07-bookings.js.map