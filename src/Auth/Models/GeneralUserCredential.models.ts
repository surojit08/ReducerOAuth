import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from "@sequelize/core";
import {
    Attribute,
    AutoIncrement,
    NotNull,
    PrimaryKey,
    BelongsTo,
    Table
} from "@sequelize/core/decorators-legacy";
import {GeneralUser} from "./GeneralUser.models";


@Table({underscored:true,tableName:'GeneralUserCredentials',createdAt:false, updatedAt:false})
class GeneralUserCredential extends Model<InferAttributes<GeneralUserCredential>,InferCreationAttributes<GeneralUserCredential>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING)
    @NotNull
    declare password: string

    @Attribute(DataTypes.STRING)
    declare LastLoginDevice: string

    @Attribute(DataTypes.DATE)
    declare LastLoginTime: Date

    @Attribute(DataTypes.STRING)
    declare OtpCode: string

    @BelongsTo(()=>GeneralUser,'userId')
    declare user: NonAttribute<GeneralUser>

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare userId: number



}


export { GeneralUserCredential };
