import { Model } from 'sequelize-typescript';
import { TokenModel } from '../token/token.model';
import { Roles } from '../enum/enum';
import { UserCreationAttrs } from '../types/types';
import { ChatModel } from '../chat/models/chat.model';
export declare class AuthModel extends Model<AuthModel, UserCreationAttrs> {
    id: number;
    email: string;
    password: string;
    role: Roles;
    tokens: TokenModel;
    chats: ChatModel[];
}
