import {CreationOptional, Model, Optional, ForeignKey} from 'sequelize';


type BookingAttributes = {
    id: number,
    userId: number,
    spotId: number,
    startDate: string,
    endDate: string,

};


type BookingCreationAttributes = Optional<
BookingAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes:any) => {

    class Booking extends Model<BookingAttributes, BookingCreationAttributes>{
        declare id: CreationOptional<number>;
        declare userId: ForeignKey<Booking['id']>;
        declare spotId: ForeignKey<Booking['id']>;
        declare startDate:string;
        declare endDate: string;

        static associate(models:any){
            Booking.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'cascade', hooks: true});
            Booking.belongsTo(models.Spot, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true});
        };
    }
    Booking.init(
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
        },
        startDate: {
            type: DataTypes.STRING,
            validate: {
                isGoodStartDate(value:string){
                    let today = new Date();
                    let startDate = new Date(value);
                    if(startDate < today){
                        throw new Error('Start date can not be in the past')
                    }
                }
            }
        },
        endDate: {
            type: DataTypes.STRING,
            validate: {
                isGoodEndDate(value:string){
                    let today = new Date();
                    let endDate = new Date(value);
                    if(endDate < today){
                        throw new Error('End date can not be in the past');
                    }
                    let start:any = this.startDate;
                    if(start >= value){
                        throw new Error('End date can not be before the start date');
                    }
                }
            }
        },
    },
    {
        sequelize,
        modelName: "Booking",
        defaultScope: {
            attributes: {
                exclude: []
            }
        },
    })
    return Booking;
}
