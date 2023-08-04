import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Association, ForeignKey} from 'sequelize';

import User from './user';

const {sequelize} = require('./index')

class UserImage extends Model<InferAttributes<UserImage>,InferCreationAttributes<UserImage>>{
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare url: string;
    declare isProfile: boolean;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;


}

UserImage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        isProfile: {
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
        modelName: 'UserImage',
       defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt", ]
        }
      }
     }
);

export default UserImage
