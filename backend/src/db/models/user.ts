import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';

import * as EmailValidator from 'email-validator'
import {Spot} from './spots'

const sequelize = new Sequelize('sqlite3://root:anthonybronca@localhost:8000/')
// order of InferAttributes & InferCreationAttributes is important.
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare username: string;
  declare firstname: string;
  declare lastname: string;
  declare email:string;
  declare bio:string | null;
  declare hashedPassword:string;
  declare profileImg:string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  //association declarations
//   declare getProjects: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
//   declare addProject: HasManyAddAssociationMixin<Project, number>;
//   declare addProjects: HasManyAddAssociationsMixin<Project, number>;
//   declare setProjects: HasManySetAssociationsMixin<Project, number>;
//   declare removeProject: HasManyRemoveAssociationMixin<Project, number>;
//   declare removeProjects: HasManyRemoveAssociationsMixin<Project, number>;
//   declare hasProject: HasManyHasAssociationMixin<Project, number>;
//   declare hasProjects: HasManyHasAssociationsMixin<Project, number>;
//   declare countProjects: HasManyCountAssociationsMixin;
//   declare createProject: HasManyCreateAssociationMixin<Project, 'ownerId'>;

// You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  // declare projects?: NonAttribute<Project[]>; // Note this is optional since it's only populated when explicitly requested in code

// getters that are not attributes should be tagged using NonAttribute
  // to remove them from the model's Attribute Typings.

  get fullName():NonAttribute<string>{
    return `${this.firstname} ${this.lastname}`
  }
}
User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [4,12]
        }
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [5,12],
            validateEmail(value:string):boolean{
                let valArr = value.split('');
                return valArr.includes('@') && value.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/) !== null
                //EmailValidator.validate(value);
            }
        }
      },
      bio: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 150],
          validStart(value:string | null){
            if(typeof value === 'string'){
              if(value.startsWith(' ')){
                throw new Error('Bio can not start with empty spaces');
              }
            }
          }
        }
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8,24],
        }
      },
      profileImg: {
        type: DataTypes.STRING,
        //change this when we add AWS
        defaultValue: 'https://freesvg.org/img/abstract-user-flat-4.png',
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
       updated_at: {
        type: DataTypes.DATE,
        defaultValue: new Date()
      }
    },
    {
        tableName: 'users',
        sequelize
    }
)
//associations
User.hasMany(Spot, {
  sourceKey: 'id',
  foreignKey: 'userId'
})


export {User}
