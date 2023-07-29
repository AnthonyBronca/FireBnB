import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';


const sequelize = new Sequelize('sqlite://root:anthonybronca@localhost:8000/dev.db')
// order of InferAttributes & InferCreationAttributes is important.
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).

  declare id: CreationOptional<number>;
  declare firstname:string;
  declare lastname:string;
  declare username:string;
  declare email:string;
  declare bio:string;
  declare hashedpassword:string;
  declare profileimage: string;
  declare createdAt: Date;
  declare updatedAt: Date;


};
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      validate: {
        len: [4,10]
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        len: [4,10]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4,10]
      }
    },
    hashedpassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4,8]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [4,10]
      }
    },
    profileimage: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  },{
    tableName: 'users',
    sequelize
  }
);
