import {Association, CreationOptional, DataTypes, Model, Optional, ForeignKey} from 'sequelize';



const {Validator} = require('sequelize');

type ReviewImageAttributes = {
    id: number,
    reviewId: number,
    url: string,

};


type ReviewImageCreationAttributes = Optional<
ReviewImageAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes:any) => {

    class ReviewImage extends Model<ReviewImageAttributes, ReviewImageCreationAttributes>{
        declare id: CreationOptional<number>;
        declare reviewId: ForeignKey<ReviewImage['id']>;
        declare url:string;


        static associate(models:any){
            ReviewImage.belongsTo(models.Review, { foreignKey: 'reviewId', onDelete: 'cascade', hooks: true});

        }

    }
    ReviewImage.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            reviewId: {
                type: DataTypes.NUMBER,
                allowNull:false
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false
            },
    },
    {
        sequelize,
        modelName: "ReviewImage",
        defaultScope: {
        },
    }
    )
    return ReviewImage;
}
