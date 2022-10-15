import { Model } from 'sequelize-typescript';
import { UserModel } from '../../user/user.model';
import { ChatModel } from './chat.model';
export declare class ChatUserModel extends Model {
    id: number;
    userId: number;
    user: UserModel;
    chatId: number;
    chat: ChatModel;
}
