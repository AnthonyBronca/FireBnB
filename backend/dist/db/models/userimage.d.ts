import { Association, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import User from './user';
declare class UserImage extends Model<InferAttributes<UserImage>, InferCreationAttributes<UserImage>> {
    id: CreationOptional<number>;
    userid: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    static associations: {
        users: Association<UserImage, User>;
    };
}
export = UserImage;
