import { Model } from 'sequelize-typescript';
import { UserModel } from '../auth/user.model';
export declare class ChatModel extends Model<ChatModel> {
    id: number;
    users: UserModel[];
}
