import {Association, CreationOptional, DataTypes, Model, Optional, ForeignKey} from 'sequelize';



const {Validator} = require('sequelize');

type SpotImageAttributes = {
    id: number,
    spotId: number,
    url: string,
    isPreview: boolean

};


type SpotImageCreationAttribute = Optional<
SpotImageAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes:any) => {

    class SpotImage extends Model<SpotImageAttributes, SpotImageCreationAttribute>{
        declare id: CreationOptional<number>;
        declare spotId: ForeignKey<SpotImage['id']>;
        declare url:string;
        declare isPreview: boolean;


        static associate(models:any){
            SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId'})

        }


        // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };

    }
    SpotImage.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            spotId: {
                type: DataTypes.NUMBER,
                allowNull:false
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isPreview: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            }

    },
    {
        sequelize,
        modelName: "SpotImage",
        defaultScope: {
        },
    }
    )
    return SpotImage;
}
