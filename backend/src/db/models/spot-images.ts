import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Association, ForeignKey} from 'sequelize';

import Spot from './spots';
const {sequelize} = require('./index')

class SpotImage extends Model<InferAttributes<SpotImage>,InferCreationAttributes<SpotImage>>{
    declare id: CreationOptional<number>;
    declare spotId: ForeignKey<Spot['id']>;
    declare url: string;
    declare isPreview: boolean;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;


}

SpotImage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        spotId: {
            type: DataTypes.INTEGER
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        isPreview: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
        modelName: 'SpotImage',
       defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt", ]
        }
      }
     }
);

export default SpotImage
