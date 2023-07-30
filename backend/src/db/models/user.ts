import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';



import UserImage from './userimage';
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



   declare getUserImage: HasManyGetAssociationsMixin<UserImage>; // Note the null assertions!
   declare addUserImage: HasManyAddAssociationMixin<UserImage, number>;
   declare addUserImages: HasManyAddAssociationsMixin<UserImage, number>;
   declare setUserImages: HasManySetAssociationsMixin<UserImage, number>;
   declare removeUserImage: HasManyRemoveAssociationMixin<UserImage, number>;
   declare removeUserImages: HasManyRemoveAssociationsMixin<UserImage, number>;
   declare hasUserImage: HasManyHasAssociationMixin<UserImage, number>;
   declare hasUserImages: HasManyHasAssociationsMixin<UserImage, number>;
   declare countUserImages: HasManyCountAssociationsMixin;
   declare createUserImage: HasManyCreateAssociationMixin<UserImage, 'userid'>;




  public static associations: {
    userImages: Association<User, UserImage>
  }

};
const sequelize = new Sequelize('sqlite://root:anthonybronca@localhost:8000/dev.db')

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashedpassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
    sequelize: sequelize
  });

  // User.hasMany(UserImage, {
  //   foreignKey: 'userid',
  //   as: 'userimages'
  // });



// User.hasMany(UserImage, {sourceKey: 'id', foreignKey: 'userid', as: 'userimages'});

export = User
