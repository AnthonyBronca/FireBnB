import {CreationOptional, Model, Optional, ForeignKey} from 'sequelize';


type ReviewAttributes = {
    id: number,
    userId: number,
    spotId: number,
    stars: number,
    review: string,

};


type ReviewCreationAttributes = Optional<
ReviewAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes:any) => {

    class Review extends Model<ReviewAttributes, ReviewCreationAttributes>{
        declare id: CreationOptional<number>;
        declare userId: ForeignKey<Review['id']>;
        declare spotId: ForeignKey<Review['id']>;
        declare stars:number;
        declare review: string;


        static associate(models:any){
            Review.belongsTo(models.User, { foreignKey: 'userId'});
            Review.belongsTo(models.Spot, { foreignKey: 'spotId'});
            Review.hasMany(models.ReviewImage, {foreignKey: 'reviewId', onDelete: 'cascade', hooks: true});
        };
    }
    Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        stars: {
            type: DataTypes.INTEGER,
            validate:{
                isGoodNumber(value: number){
                    if(value < 0 || value > 5){
                        throw new Error("Score must be a number from 0 - 5");
                    }
                }
            }
        },
        review: {
            type: DataTypes.STRING,
            validate: {
                goodDescription(value:string){
                    if(value.startsWith(' ')){
                        throw new Error('Description can not start with spaces');
                    }
                },
                len: [2, 70]
            }
        },
        userId: {
            type: DataTypes.INTEGER
        },
        spotId: {
            type: DataTypes.INTEGER
        },
    },
    {
        sequelize,
        modelName: "Review",
        defaultScope: {
            attributes: {
                exclude: []
            }
        },
    })
    return Review;
}
