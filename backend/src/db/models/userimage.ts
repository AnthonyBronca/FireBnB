import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';

const sequelize = new Sequelize('sqlite://root:anthonybronca@localhost:8000/dist/db/dev.db');

import User from './user';


class UserImage extends Model<InferAttributes<UserImage>, InferCreationAttributes<UserImage>> {

    declare id: CreationOptional<number>;
    declare userid: ForeignKey<User['id']>;
    declare url: string;
    declare createdAt: Date;
    declare updatedAt: Date;


  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.



      public static associations: {
    users: Association<UserImage, User>
  }

};

UserImage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: {
            type: DataTypes.INTEGER
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: 'UserImage',
        tableName: 'UserImage',
        sequelize
    }
);

// UserImage.belongsTo(User, {
//     targetKey: 'id'
// })

export = UserImage
