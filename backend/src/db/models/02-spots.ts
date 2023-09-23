import {CreationOptional, Model, Optional, ForeignKey} from 'sequelize';

type SpotAttributes = {
    id: number,
    address: string,
    city: string,
    state: string,
    country: string,
    description: string,
    name: string,
    lat: string,
    lng:string,
    price: number,
    userId: number,

};


type SpotCreationAttributes = Optional<
SpotAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes:any) => {

    class Spot extends Model<SpotAttributes, SpotCreationAttributes>{
        declare id: CreationOptional<number>;
        declare address:string;
        declare city:string;
        declare state:string;
        declare country:string;
        declare description:string;
        declare name: string;
        declare price: number;
        declare lat:string;
        declare lng:string;
        declare userId: ForeignKey<Spot['id']>;


        static associate(models:any){
            Spot.belongsTo(models.User, { foreignKey: 'userId', as: "Owner"})
            Spot.hasMany(models.SpotImage, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true});
            Spot.hasMany(models.Review, {foreignKey: 'spotId', onDelete: 'cascade', hooks:true});
            Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: 'cascade', hooks: true});
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
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                goodDescription(value:string){
                    if(value.startsWith(' ')){
                        throw new Error('Description can not start with spaces');
                    }
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lat: {
            type: DataTypes.STRING,
        },
        lng: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER
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
