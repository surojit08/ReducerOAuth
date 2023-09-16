import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model,} from "@sequelize/core";
import {
    Attribute,
    PrimaryKey,
    AutoIncrement,
    NotNull,
    Default,
    Table,
    AllowNull
} from '@sequelize/core/decorators-legacy';



@Table({underscored:true, tableName:"GeneralUsers",createdAt:false, updatedAt:false})
class GeneralUser extends Model<InferAttributes<GeneralUser>,InferCreationAttributes<GeneralUser>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING)
    @NotNull
    declare firstName: string

    @Attribute(DataTypes.STRING)
    @NotNull
    declare lastName: string

    @Attribute(DataTypes.STRING)
    @AllowNull
    declare middleName: string

    @Attribute(DataTypes.STRING)
    @NotNull
    declare email: string

    @Attribute(DataTypes.STRING)
    @NotNull
    @Default("A")
    declare status: string


    @Attribute(DataTypes.UUID)
    @Default(DataTypes.UUIDV4)
    @NotNull
    declare userId: string



}


export { GeneralUser };
