import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, DECIMAL,
} from 'sequelize';

import {User} from './user';
import {states} from '../../utils/states';
const sequelize = new Sequelize('sqlite3://root:anthonybronca@localhost:8000/');

class Spot extends Model<InferAttributes<Spot>, InferCreationAttributes<Spot>> {


    declare id: CreationOptional<number>;
    declare address: string;
    declare zipcode: number;
    declare city: string;
    declare state: string;
    // declare spot_type:
    declare description: CreationOptional<string>;
    declare lat: number;
    declare long: number;
    declare userId: number;
    declare available: boolean;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;


    //Association declarations
    // declare public static associations: { [users: string]: Association<Model<User, any>, Model<any, any>>; };

    //getters that are not attributes

    get fullAddress():NonAttribute<string>{
        return `${this.address} ${this.city},${this.state} ${this.zipcode}`;
    }
}

Spot.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey:true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
               len: [5, 55]
            }
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
                isUppercase: true,
                len: [2,2],
                isState(value:string){
                    if(!value) throw new Error('Value must exist.');
                    // if(states.includes(value.toUpperCase())) return true;
                    if(!states.includes(value.toUpperCase()))  throw new Error('You must pass in a valid state abbreviation ')
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            validate: {
                meetsRequirement(value: string):Error | boolean{
                    if(value.startsWith(' ')) throw new Error('Description can not start with spaces.');
                    return true;
                }
            }
        },
        lat: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        long: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false
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
        tableName: 'spots',
        sequelize
    }
)

Spot.belongsTo(User, {
    targetKey: 'id'
})


export {Spot}
