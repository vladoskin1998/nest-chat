import { Model } from 'sequelize-typescript';
import { TokenModel } from './token.model';
import { Roles } from '../../enum/enum';
import { UserCreationAttrs } from '../../types/types';
export declare class UserModel extends Model<UserModel, UserCreationAttrs> {
    id: number;
    email: string;
    password: string;
    role: Roles;
    tokens: TokenModel;
}
