import {CreationOptional, Model, Optional, ForeignKey} from 'sequelize';

type SpotAttributes = {
    id: number,
    address: string,
    zipcode: string,
    city: string,
    state: string,
    spotType: string,
    description: string,
    lat: number,
    long:number,
    available: boolean,
    userId: number,

};


type SpotCreationAttributes = Optional<
SpotAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes:any) => {

    class Spot extends Model<SpotAttributes, SpotCreationAttributes>{
        declare id: CreationOptional<number>;
        declare address:string;
        declare zipcode: string;
        declare city:string;
        declare state:string;
        declare spotType:string;
        declare description:string;
        declare lat:number;
        declare long:number;
        declare available: boolean;
        declare userId: ForeignKey<Spot['id']>;


        static associate(models:any){
            Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: "Owner"})
            // Spot.hasMany(models.SpotImage, { foreignKey: 'spotId'})
            // Spot.hasMany(models.Booking, {foreignKey: 'spotId'})
            // Spot.hasMany(models.Review, {foreignKey: 'spotId'})
        }
    }
    Spot.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        address: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        zipcode: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                len: [5,5]
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2,2]
            }
        },
        spotType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                checkSpotType(value:string){
                    let allowedTypes = new Set(['apartment', 'house', 'duplex', 'condo']);
                    if(!allowedTypes.has(value.toLowerCase())){
                        throw new Error('The Spot Type is currently not available to be listed on FirBnB at this time.')
                    }
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                goodDescription(value:string){
                    if(!value.startsWith(' ')){
                        throw new Error('Description can not start with spaces');
                    }
                }
            }
        },
        lat: {
            type: DataTypes.INTEGER,
        },
        long: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    },
    {
        sequelize,
        modelName: "Spot",
        defaultScope: {
            attributes: {
                exclude: []
            }
        },
    }
    )
    return Spot;
}
