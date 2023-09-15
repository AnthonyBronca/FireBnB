// import {Association, CreationOptional, DataTypes, Model, Optional, ForeignKey} from 'sequelize';


// const {Validator} = require('sequelize');

// type UserImageAttributes = {
//     id: number,
//     userId: number,
//     url: string,
//     isProfile: boolean

// };


// type UserImageCreationAttribute = Optional<
// UserImageAttributes, 'id'>;

// module.exports = (sequelize: any, DataTypes:any) => {

//     class UserImage extends Model<UserImageAttributes, UserImageCreationAttribute>{
//         declare id: CreationOptional<number>;
//         declare userId: ForeignKey<UserImage['id']>;
//         declare url:string;
//         declare isProfile: boolean;


//         static associate(models:any){
//             UserImage.belongsTo(models.User, { foreignKey: 'userId'})

//         }


//         // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };

//     }
//     UserImage.init(
//         {
//             id: {
//                 type: DataTypes.INTEGER,
//                 autoIncrement: true,
//                 primaryKey: true
//             },
//             userId: {
//                 type: DataTypes.NUMBER,
//                 allowNull:false
//             },
//             url: {
//                 type: DataTypes.STRING,
//                 allowNull: false
//             },
//             isProfile: {
//                 type: DataTypes.BOOLEAN,
//                 allowNull: false,
//             }

//     },
//     {
//         sequelize,
//         modelName: "UserImage",
//         defaultScope: {
//         },
//     }
//     )
//     return UserImage;
// }
