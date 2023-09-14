import {CreationOptional, Model, Optional, ForeignKey} from 'sequelize';

type SpotAttributes = {
    id: number,
    address: string,
    city: string,
    state: string,
    description: string,
    lat: number,
    long:number,
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
        declare description:string;
        declare lat:number;
        declare long:number;
        declare userId: ForeignKey<Spot['id']>;


        static associate(models:any){
            Spot.belongsTo(models.User, { foreignKey: 'userId', as: "Owner"})
            Spot.hasMany(models.SpotImage, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true})
            Spot.hasMany(models.UserImage, {foreignKey: 'userId', onDelete: 'cascade', hooks:true})
            // Spot.hasMany(models.Booking, {foreignKey: 'spotId'})
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
        lat: {
            type: DataTypes.FLOAT,
        },
        long: {
            type: DataTypes.FLOAT,
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
