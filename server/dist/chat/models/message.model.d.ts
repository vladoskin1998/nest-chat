import { Model } from 'sequelize-typescript';
import { ChatModel } from './chat.model';
export declare class MessageModel extends Model<MessageModel> {
    id: number;
    message: string;
    chatId: number;
    chat: ChatModel;
    userId: number;
}
