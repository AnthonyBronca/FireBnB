import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Association, ForeignKey} from 'sequelize';

import Review from './reviews';
const {sequelize} = require('./index')

class ReviewImage extends Model<InferAttributes<ReviewImage>,InferCreationAttributes<ReviewImage>>{
    declare id: CreationOptional<number>;
    declare reviewId: ForeignKey<Review['id']>;
    declare url: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

ReviewImage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        reviewId: {
            type: DataTypes.INTEGER
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
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
        modelName: 'ReviewImage',
       defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt", ]
        }
      }
     }
);

export default ReviewImage
