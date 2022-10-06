import { Model } from 'sequelize-typescript';
import { AuthModel } from '../../auth/auth.model';
import { ChatUserModel } from './chat-user.model';
import { MessageModel } from './message.model';
export declare class ChatModel extends Model<ChatModel> {
    id: number;
    users: AuthModel[];
    chatUserId: ChatUserModel[];
    message: MessageModel[];
}
