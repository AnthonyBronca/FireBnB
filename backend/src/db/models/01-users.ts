import {Association, CreationOptional, DataTypes, Model, Optional} from 'sequelize';

const {Validator} = require('sequelize');

type UserAttributes = {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    bio: string,
    isHost: boolean,
    hashedPassword: string,
};




type UserCreationAttributes = Optional<
UserAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes:any) => {

    class User extends Model<UserAttributes, UserCreationAttributes>{
        declare id: CreationOptional<number>;
        declare firstName:string;
        declare lastName:string;
        declare email:string;
        declare username: string;
        declare bio: string;
        declare isHost: boolean;
        declare hashedPassword: string;


        async getSafeUser(){
            const safeUser = {
                id: this.id,
                email: this.email,
                username: this.username,
                firstName: this.firstName,
                lastName: this.lastName,
                isHost: this.isHost,
            };
            return safeUser
        }

        static associate(models:any){
            User.hasMany(models.Spot, {foreignKey: 'userId', onDelete: 'cascade', hooks: true});
            User.hasMany(models.Booking, {foreignKey: 'userId', onDelete: 'cascade', hooks: true});
            User.hasMany(models.UserImage, {foreignKey: 'userId', onDelete: 'cascade', hooks:true});
            User.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'cascade', hooks: true});
            User.hasMany(models.Like, {foreignKey: 'userId', onDelete: 'cascade', hooks: true})
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
                    isGoodLength(value:string){
                    if(value.length < 1 || value.length > 30){
                        throw new Error('First name must be between 1 - 30 characters');
                    }
                },
                }
            },
            lastName: {
                type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isGoodLength(value:string){
                    if(value.length < 1 || value.length > 30){
                        throw new Error('Last name must be between 1 - 30 characters');
                    }
                },
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isGoodLength(value:string){
                    if(value.length < 6 || value.length > 12){
                        throw new Error('Username must be between 6 - 12 characters');
                    }
                },
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
                isGoodLength(value:string){
                    if(value.length < 3 || value.length > 256){
                        throw new Error('Email must be between 3 - 256 characters');
                    }
                },
                isEmail: true
            }
        },
        isHost: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
                exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
            }
        },
    }
    )
    return User;
}
