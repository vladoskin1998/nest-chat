import { Model } from 'sequelize-typescript';
import { UserModel } from '../../user/user.model';
import { ChatUserModel } from './chat-user.model';
import { MessageModel } from './message.model';
export declare class ChatModel extends Model<ChatModel> {
    id: number;
    users: UserModel[];
    chatUserId: ChatUserModel[];
    message: MessageModel[];
}
