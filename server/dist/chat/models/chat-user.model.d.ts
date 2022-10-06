import { Model } from 'sequelize-typescript';
import { AuthModel } from '../../auth/auth.model';
import { ChatModel } from './chat.model';
export declare class ChatUserModel extends Model {
    id: number;
    userId: number;
    user: AuthModel;
    chatId: number;
    chat: ChatModel;
}
