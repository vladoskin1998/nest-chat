import { Model } from "sequelize-typescript";
import { UserModel } from './user.model';
import { TokenModelI } from '../../types/types';
export declare class TokenModel extends Model<TokenModel, TokenModelI> {
    refreshToken: string;
    accessToken: string;
    userId: number;
    user: UserModel;
}
