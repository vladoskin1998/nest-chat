import { Model } from 'sequelize-typescript';
export declare class ChatUserModel extends Model {
    id: number;
    userId: number;
    chatId: number;
}
