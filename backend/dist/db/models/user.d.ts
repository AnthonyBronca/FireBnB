import { Association, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import UserImage from './userimage';
declare class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    id: CreationOptional<number>;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    bio: string;
    hashedpassword: string;
    profileimage: string;
    createdAt: Date;
    updatedAt: Date;
    static associations: {
        userImages: Association<User, UserImage>;
    };
}
export = User;
