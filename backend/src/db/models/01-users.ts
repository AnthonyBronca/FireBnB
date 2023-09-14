import {Association, CreationOptional, DataTypes, Model, Optional} from 'sequelize';

const {Validator} = require('sequelize');

type UserAttributes = {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    bio: string,
    hashedPassword: string,

};


type UserCreationAttributes = Optional<
UserAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes:any) => {

    class User extends Model<UserAttributes, UserCreationAttributes>{
        declare id: CreationOptional<number>;
        declare firstName:string;
        declare lastName:string;
        declare username: string;
        declare bio: string;
        declare hashedPassword: string;


        static associate(models:any){
            User.hasMany(models.Spot, { foreignKey: 'userId', onDelete: 'cascade', hooks: true})
            User.hasMany(models.UserImage, {foreignKey: 'userId', onDelete: 'cascade', hooks:true})
            User.hasMany(models.Review, {foreignKey: 'userId', onDelete: 'cascade', hooks:true})
        }


        // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };

    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 30]
                }
            },
            lastName: {
                type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 15],
                isNotEmail(value: string) {
                    if (Validator.isEmail(value)) {
                        throw new Error("Cannot be an email.");
                    }
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 256],
                isEmail: true
            }
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [60, 60]
            }
        },
        bio: {
            type: DataTypes.STRING
        },
    },
    {
        sequelize,
        modelName: "User",
        defaultScope: {
            attributes: {
                exclude: ["hashedPassword", "createdAt", "updatedAt"]
            }
        },
    }
    )
    return User;
}
