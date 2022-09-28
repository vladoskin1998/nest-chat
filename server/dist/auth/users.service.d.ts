import { UsersModel } from './users.model';
import { UsersDto } from './userDto/users.dto';
export declare class UsersService {
    private usersModel;
    constructor(usersModel: typeof UsersModel);
    registration(UserDto: UsersDto): Promise<UsersModel>;
    login(): Promise<void>;
    refresh(): Promise<void>;
    delete(): Promise<void>;
}
