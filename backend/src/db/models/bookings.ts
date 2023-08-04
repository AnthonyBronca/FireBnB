import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Association, ForeignKey, Sequelize} from 'sequelize';

import User from './user';
import Spot from './spots';


const {sequelize} = require('./index');

class Booking extends Model<InferAttributes<Booking>,InferCreationAttributes<Booking>>{
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare spotId: ForeignKey<Spot['id']>;
    declare startDate: Date;
    declare endDate: Date;
    declare active: boolean;
    declare cancelledDate: CreationOptional<Date>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

}

Booking.init(
    {
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
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isAfter: '2014-12-31',
                isBefore: '2030-1-01',
            }
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull:false,
            validate: {
                isAfter: '2014-12-31',
                isBefore: '2030-1-01',
            }
        },
        active: {
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        cancelledDate: {
            type: DataTypes.DATE,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    },
    {
        sequelize,
        modelName: 'Booking',
        defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt", ]
        }
      }
     }
);


export default Booking
