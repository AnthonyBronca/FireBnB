import { Association, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
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
    getUserImage: HasManyGetAssociationsMixin<UserImage>;
    addUserImage: HasManyAddAssociationMixin<UserImage, number>;
    addUserImages: HasManyAddAssociationsMixin<UserImage, number>;
    setUserImages: HasManySetAssociationsMixin<UserImage, number>;
    removeUserImage: HasManyRemoveAssociationMixin<UserImage, number>;
    removeUserImages: HasManyRemoveAssociationsMixin<UserImage, number>;
    hasUserImage: HasManyHasAssociationMixin<UserImage, number>;
    hasUserImages: HasManyHasAssociationsMixin<UserImage, number>;
    countUserImages: HasManyCountAssociationsMixin;
    createUserImage: HasManyCreateAssociationMixin<UserImage, 'userid'>;
    static associations: {
        userImages: Association<User, UserImage>;
    };
}
export = User;
