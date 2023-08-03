import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Association, ForeignKey} from 'sequelize';

import User from './user';
import Spot from './spots';


const {sequelize} = require('./index');

class Review extends Model<InferAttributes<Review>,InferCreationAttributes<Review>>{
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare spotId: ForeignKey<Spot['id']>;
    declare score: number;
    declare review:string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        review: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            defaultValue: "",
                validate: {
                goodReview(value:string){
                    if(!value.startsWith(' ')){
                        throw new Error('Review can not start with spaces');
                    }
                }
            }
        },
        score: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                len: [1,1]
            }
        },
        userId: {
            type: DataTypes.INTEGER
        },
        spotId: {
            type: DataTypes.INTEGER
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
        modelName: 'Review',
       defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId", "spotId", ]
        }
      }
     }
);

// Review.hasMany(ReviewImage, {
//     sourceKey: 'id',
//     foreignKey: 'reviewId',
//     as: 'ReviewImage'
// });

// ReviewImage.belongsTo(Review, {targetKey: 'id'});

export default Review
