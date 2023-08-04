import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Association, ForeignKey} from 'sequelize';

import User from './user';
import SpotImage from './spot-images';
import Review from './reviews';

const {sequelize} = require('./index')

class Spot extends Model<InferAttributes<Spot>,InferCreationAttributes<Spot>>{
    declare id: CreationOptional<number>;
    declare address:string;
    declare zipcode: number;
    declare city:string;
    declare state:string;
    declare spotType:string;
    declare description:string;
    declare lat:number;
    declare long:number;
    declare available: boolean;
    declare userId: ForeignKey<User['id']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;


}

Spot.init(
    {
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
                len: [5,5]
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
                len: [2,2]
            }
        },
        spotType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                checkSpotType(value:string){
                    let allowedTypes = new Set(['apartment', 'house', 'duplex', 'condo']);
                    if(!allowedTypes.has(value.toLowerCase())){
                        throw new Error('The Spot Type is currently not available to be listed on FirBnB at this time.')
                    }
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                goodDescription(value:string){
                    if(!value.startsWith(' ')){
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
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    },
    {
        sequelize,
        modelName: 'Spot',
       defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt", "lat", "long", ]
        }
      }
     }
);

Spot.hasMany(SpotImage, {
    sourceKey: 'id',
    foreignKey: 'spotId',
    as: 'SpotImage'
});

SpotImage.belongsTo(Spot, {targetKey: 'id'});

Spot.hasMany(Review, {
    sourceKey: 'id',
    foreignKey: 'spotId',
    as: 'Review'
});

Review.belongsTo(Spot, {targetKey: 'id'});

export default Spot
