import { Column, DataType, Model,Table, BelongsTo,ForeignKey} from "sequelize-typescript";
import { AuthModel } from '../auth/auth.model';
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

    @ForeignKey(() => AuthModel)
    @Column
    userId: number

    @BelongsTo(() => AuthModel)
    user: AuthModel



}