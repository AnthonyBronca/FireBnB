import {CreationOptional, Model, Optional, ForeignKey} from 'sequelize';

type LikeAttributes = {
    id: number,
    userId: number,
    spotId: number

};


type LikeCreationAttributes = Optional<
LikeAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes:any) => {

    class Like extends Model<LikeAttributes, LikeCreationAttributes>{
        declare id: CreationOptional<number>;
        declare userId: ForeignKey<Like['id']>;
        declare spotId: ForeignKey<Like['id']>;


        static associate(models:any){
            Like.belongsTo(models.User, { foreignKey: 'userId'})
            Like.belongsTo(models.Spot, { foreignKey: 'spotId'})
        }
    }
    Like.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        spotId: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: "Like",
        defaultScope: {
            attributes: {
                exclude: []
            }
        },
    })
    return Like;
}
