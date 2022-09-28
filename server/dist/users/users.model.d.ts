import { Model } from 'sequelize-typescript';
interface UserCreationAttrs {
    email: string;
    password: string;
}
export declare class UsersModel extends Model<UsersModel, UserCreationAttrs> {
    id: number;
    email: string;
    password: string;
}
export {};
