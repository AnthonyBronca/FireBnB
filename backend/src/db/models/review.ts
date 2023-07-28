import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, DECIMAL,
} from 'sequelize';

import {User} from './user';
import {Spot} from './spots';
const sequelize = new Sequelize('sqlite3://root:anthonybronca@localhost:8000/');

class Review extends Model<InferAttributes<Review>,InferCreationAttributes<Review>> {


    declare id: CreationOptional<number>;
    declare userId: number;
    declare spotId: number;
    declare score: number;
    declare review: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        spotId: {
            type: DataTypes.INTEGER
        },
        score: {
            type: DataTypes.INTEGER,
        },
        review: {
            type: DataTypes.TEXT
        },
         createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date()
         },
         updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date()
         }
    },
    {
        tableName: 'reviews',
        sequelize
});

Review.belongsTo(User, {
    targetKey: 'id'
});

Review.belongsTo(Spot, {
    targetKey: 'id'
});

export {Review};
