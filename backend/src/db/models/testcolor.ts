import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Association} from 'sequelize';


const {TestUser} = require('./testuser');

module.exports = (sequelize:any, DataTypes:any) => {
class TestColor extends Model<InferAttributes<TestColor>,InferCreationAttributes<TestColor>>{
    declare id: CreationOptional<number>;
    declare name:string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

}

TestColor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [2,20],
                endsInY(value:string){
                    if(value[value.length - 1].toLowerCase() === 'y'){
                        throw new Error('color must not end in the letter "y"');
                    }
                }
            }
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
        modelName: 'TestColor',
       defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      }
     }
    );
    return TestColor;
};
