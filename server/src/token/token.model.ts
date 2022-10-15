import { Column, DataType, Model,Table, BelongsTo,ForeignKey} from "sequelize-typescript";
import { UserModel } from '../user/user.model';
import { TokenModelI } from '../types/types';

@Table({tableName:'tokens'})
export class TokenModel extends Model<TokenModel, TokenModelI >{

    @Column({
        type: DataType.STRING
    })
    refreshToken: string

    @Column({
        type: DataType.STRING
    })
    accessToken: string

    @ForeignKey(() => UserModel)
    @Column
    userId: number

    @BelongsTo(() => UserModel)
    user: UserModel



}